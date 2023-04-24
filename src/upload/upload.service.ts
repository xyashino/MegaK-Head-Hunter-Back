import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { parse } from 'papaparse';
import { Student } from '../students/entities/student.entity';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../enums/user-role.enums';
import { StudentImportDto } from './dto/student-import.dto';
import { MulterMemoryUploadedFile } from '../interfaces/files';
import { filteredResults } from '../utils/file-filters';

@Injectable()
export class UploadService {
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
      complete: filteredResults,
    });

    if (errors.length > 0) {
      throw new HttpException('CSV parsing errors', HttpStatus.BAD_REQUEST);
    }
    return await this.importStudents(data);
  }

  async importStudents(students: StudentImportDto[]) {
    for (const studentItem of students) {
      const existUser = await User.findOneBy({ email: studentItem.email });

      if (!existUser) {
        const user = await new User();
        const student = await new Student();

        user.email = studentItem.email;
        user.role = UserRole.STUDENT;
        user.isActive = false;
        await user.save();

        student.user = user;
        student.bonusProjectUrls = studentItem.bonusProjectUrls;
        student.courseCompletion = studentItem.courseCompletion;
        student.projectDegree = studentItem.projectDegree;
        student.teamProjectDegree = studentItem.teamProjectDegree;
        student.courseEngagement = studentItem.courseEngagement;
        await student.save();
      }
    }
    return 'Students imported successfully';
  }
}
