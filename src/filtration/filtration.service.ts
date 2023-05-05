import { Injectable } from '@nestjs/common';
import { Student } from 'src/students/entities/student.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class FiltrationService {
  constructor(private readonly dataSource: DataSource) {}

  async filterStudentPreferences(queryData): Promise<any> {
    return await this.dataSource
      .createQueryBuilder()
      .select('student')
      .from(Student, 'student')

      // sql queries

      .andWhere('student.expectedTypeWork = :expectedTypeWork ', {
        expectedTypeWork: String(queryData.expectedTypeWork),
      })

      .andWhere('student.expectedContractType = :expectedContractType', {
        expectedContractType: String(queryData.expectedContractType || ''),
      })

      .andWhere('student.courseEngagement >= :courseEngagement', {
        courseEngagement:
          queryData.courseEngagement === undefined
            ? 1
            : Number(queryData.courseEngagement),
      })
      .andWhere('student.courseCompletion >= :courseCompletion', {
        courseCompletion:
          queryData.courseCompletion === undefined
            ? 1
            : Number(queryData.courseCompletion),
      })
      .andWhere('student.projectDegree >= :projectDegree', {
        projectDegree:
          queryData.projectDegree === undefined
            ? 1
            : Number(queryData.projectDegree),
      })
      .andWhere('student.teamProjectDegree >= :teamProjectDegree', {
        teamProjectDegree:
          queryData.teamProjectDegree === undefined
            ? 1
            : Number(queryData.teamProjectDegree),
      })
      .andWhere('student.canTakeApprenticeship = :canTakeApprenticeship', {
        canTakeApprenticeship: Boolean(queryData.canTakeApprenticeship),
      })
      .andWhere('student.monthsOfCommercialExp >= :monthsOfCommercialExp', {
        monthsOfCommercialExp:
          queryData.monthsOfCommercialExp === undefined
            ? 0
            : Number(queryData.monthsOfCommercialExp),
      })
      .andWhere('student.expectedSalary BETWEEN :minSalary AND :maxSalary', {
        minSalary:
          queryData.minSalary === undefined ? 0 : Number(queryData.minSalary),
        maxSalary:
          queryData.maxSalary === undefined ? 0 : Number(queryData.maxSalary),
      })

      .getMany();
  }
}
