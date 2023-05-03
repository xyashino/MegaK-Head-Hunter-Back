import { Injectable } from '@nestjs/common';
import { Student } from 'src/students/entities/student.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class FiltrationService {
  constructor(private readonly dataSource: DataSource) {}

  async findMark(mark): Promise<any> {
    return await this.dataSource
      .createQueryBuilder()
      .select('student')
      .from(Student, 'student')

      // sql queries

      
  }
}
