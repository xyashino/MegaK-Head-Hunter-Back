import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { parse } from 'papaparse';
import { Student } from '../students/entities/student.entity';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../enums/user-role.enums';
import { StudentImportDto } from './dto/student-import.dto';
import { MulterMemoryUploadedFiles } from '../interfaces/files';

@Injectable()
export class UploadService {
  async uploadStudents(file: MulterMemoryUploadedFiles) {
    const uploadStudents = file?.uploadStudents?.[0] ?? null;

    if (!uploadStudents) {
      throw new HttpException('Not found file', HttpStatus.NOT_FOUND);
    }

    try {
      const csvData = uploadStudents.buffer.toString();

      const { data } = await parse(csvData, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.replace('#', '').trim(),
        complete: (results) => results,
      });

      return await this.importStudents(data);
    } catch (e) {
      console.log(e);
    }
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
