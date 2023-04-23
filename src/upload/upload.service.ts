import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MulterDiskUploadedFiles } from '../interfaces/files';
import { readFileSync } from 'fs';
import * as path from 'path';
import { storageDir } from '../utils/storage';
import { parse } from 'papaparse';
import { Student } from '../students/entities/student.entity';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../enums/user-role.enums';
import { StudentImportDto } from './dto/student-import.dto';
import * as fs from 'fs';

@Injectable()
export class UploadService {
  async uploadStudents(files: MulterDiskUploadedFiles) {
    const uploadStudents = files?.uploadStudents?.[0] ?? null;

    if (!uploadStudents) {
      throw new HttpException('Not found file', HttpStatus.NOT_FOUND);
    }

    const pathCsvFile = path.join(
      storageDir(),
      'students',
      'students-import.csv',
    );

    try {
      const csvFile = readFileSync(pathCsvFile);
      const csvData = csvFile.toString();

      const { data } = await parse(csvData, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.replace('#', '').trim(),
        complete: (results) => results,
      });

      return await this.importStudents(data);
    } catch (e) {
      try {
        fs.unlinkSync(pathCsvFile);
      } catch (e2) {
        throw new HttpException('Cannot remove file', HttpStatus.I_AM_A_TEAPOT);
      }
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
