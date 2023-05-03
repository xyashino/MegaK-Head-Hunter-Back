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

      .andWhere('student.expectedTypeWork = :expectedTypeWork ', {
        expectedTypeWork: String(mark.expectedTypeWork || ''),
      })

      .andWhere('student.expectedContractType = :expectedContractType', {
        expectedContractType: '' || String(mark.expectedContractType || ''),
      })

      .andWhere('student.courseEngagement >= :courseEngagement', {
        courseEngagement:
          mark.courseEngagement === undefined
            ? 1
            : Number(mark.courseEngagement),
      })
      .andWhere('student.courseCompletion >= :courseCompletion', {
        courseCompletion:
          mark.projecourseCompletionctDegree === undefined
            ? 1
            : Number(mark.courseCompletion),
      })
      .andWhere('student.projectDegree >= :projectDegree', {
        projectDegree:
          mark.projectDegree === undefined ? 1 : Number(mark.projectDegree),
      })
      .andWhere('student.teamProjectDegree >= :teamProjectDegree', {
        teamProjectDegree:
          mark.teamProjectDegree === undefined
            ? 1
            : Number(mark.teamProjectDegree),
      })
      .andWhere('student.canTakeApprenticeship = :canTakeApprenticeship', {
        canTakeApprenticeship: Boolean(mark.canTakeApprenticeship),
      })
      .andWhere('student.monthsOfCommercialExp >= :monthsOfCommercialExp', {
        monthsOfCommercialExp:
          mark.monthsOfCommercialExp === undefined
            ? 0
            : Number(mark.monthsOfCommercialExp),
      })
      .andWhere('student.expectedSalary BETWEEN :minSalary AND :maxSalary', {
        minSalary: mark.minSalary === undefined ? 0 : Number(mark.minSalary),
        maxSalary: mark.maxSalary === undefined ? 0 : Number(mark.maxSalary),
      })

      .getMany();
  }
}
