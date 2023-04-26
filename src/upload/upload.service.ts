import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { parse } from 'papaparse';
import { User } from '../users/entities/user.entity';
import { StudentImportDto } from './dto/student-import.dto';
import { MulterMemoryUploadedFile } from '../interfaces/files';
import { validateRequiredColumns } from '../utils/file-filters';
import { MailService } from '../mail/mail.service';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { StudentsService } from '../students/students.service';

@Injectable()
export class UploadService {
  constructor(
    @Inject(forwardRef(() => MailService)) private mailService: MailService,
    @Inject(forwardRef(() => StudentsService))
    private studentService: StudentsService,
  ) {}

  async uploadStudents(file: MulterMemoryUploadedFile) {
    const uploadStudents = file ?? null;
    if (!uploadStudents) {
      throw new HttpException('Not found file', HttpStatus.NOT_FOUND);
    }

    const csvData = uploadStudents.buffer.toString();
    const { data, errors } = await parse(csvData, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.replace('#', '').trim(),
      complete: (results) => validateRequiredColumns(results),
    });

    if (errors.length > 0) {
      throw new HttpException('CSV parsing errors', HttpStatus.BAD_REQUEST);
    }

    for (const student of data) {
      await this.validateByDto(student);
    }

    return await this.importStudents(data);
  }

  async importStudents(students: StudentImportDto[]) {
    let count = 0;

    for (const studentItem of students) {
      const existUser = await User.findOneBy({ email: studentItem.email });

      if (!existUser) {
        const student = await this.studentService.create({
          email: studentItem.email,
          bonusProjectUrls: studentItem.bonusProjectUrls,
          courseCompletion: studentItem.courseCompletion,
          projectDegree: studentItem.projectDegree,
          teamProjectDegree: studentItem.teamProjectDegree,
          courseEngagement: studentItem.courseEngagement,
        });
        count += 1;
        await this.mailService.sendMail(
          studentItem.email,
          'Rejestracja w Head Hunter',
          './register',
          {
            registrationLink: `http://localhost:5173/register/${student.id}`,
          },
        );
      }
    }
    return {
      message: `New students added: ${count}`,
    };
  }

  async validateByDto(dto: StudentImportDto) {
    const transformedDto = plainToClass(StudentImportDto, dto);
    const errors = await validate(transformedDto, {
      validationError: { target: false },
    });
    if (errors.length > 0) {
      const validationErrors = errors.reduce((acc, error: ValidationError) => {
        acc[error.property] = Object.values(error.constraints);
        return acc;
      }, {});
      throw new HttpException(
        { message: 'Validation failed', errors: validationErrors },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
