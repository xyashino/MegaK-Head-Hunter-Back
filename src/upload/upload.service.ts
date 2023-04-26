import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { parse } from 'papaparse';
import { Student } from '../students/entities/student.entity';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../enums/user-role.enums';
import { StudentImportDto } from './dto/student-import.dto';
import { MulterMemoryUploadedFile } from '../interfaces/files';
import { validateRequiredColumns } from '../utils/file-filters';
import { MailService } from '../mail/mail.service';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UploadService {
  constructor(
    @Inject(forwardRef(() => MailService)) private mailService: MailService,
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
        const user = new User();
        user.email = studentItem.email;
        user.role = UserRole.STUDENT;
        user.isActive = false;

        await user.save();

        const student = new Student();
        student.bonusProjectUrls = studentItem.bonusProjectUrls;
        student.courseCompletion = studentItem.courseCompletion;
        student.projectDegree = studentItem.projectDegree;
        student.teamProjectDegree = studentItem.teamProjectDegree;
        student.courseEngagement = studentItem.courseEngagement;
        student.user = user;

        await student.save();
        count += 1;

        // await this.mailService.sendMail(
        //   user.email,
        //   'Rejestracja w Head Hunter',
        //   './register',
        //   {
        //     registrationLink: `http://localhost:5173/register/${student.id}`,
        //   },
        // );
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
