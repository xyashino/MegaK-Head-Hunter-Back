import { Injectable } from '@nestjs/common';
import { Student } from 'src/students/entities/student.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class FiltrationService {
  constructor(private readonly dataSource: DataSource) {}

  async filterStudentPreferences(queryData): Promise<any> {
    const queryBuilder = await this.dataSource
      .createQueryBuilder()
      .select('student')
      .from(Student, 'student');

    // sql queries

    if (queryData.courseCompletion) {
      queryBuilder.andWhere('student.courseCompletion >= :courseCompletion', {
        courseCompletion: Number(queryData.courseCompletion),
      });
    }

    if (queryData.courseEngagement) {
      queryBuilder.andWhere('student.courseEngagement >= :courseEngagement', {
        courseEngagement: Number(queryData.courseEngagement),
      });
    }

    if (queryData.projectDegree) {
      queryBuilder.andWhere('student.teamProjectDegree >= :teamProjectDegree', {
        projectDegree: Number(queryData.projectDegree),
      });
    }

    if (queryData.teamProjectDegree) {
      queryBuilder.andWhere('student.teamProjectDegree >= :teamProjectDegree', {
        teamProjectDegree: Number(queryData.teamProjectDegree),
      });
    }

    if (queryData.expectedTypeWork) {
      queryBuilder.andWhere('student.expectedTypeWork = :expectedTypeWork ', {
        expectedTypeWork: String(queryData.expectedTypeWork),
      });
    }

    if (queryData.expectedContractType) {
      queryBuilder.andWhere(
        'student.expectedContractType = :expectedContractType',
        {
          expectedContractType: String(queryData.expectedContractType),
        },
      );
    }

    if (queryData.canTakeApprenticeship) {
      queryBuilder.andWhere(
        'student.canTakeApprenticeship = :canTakeApprenticeship',
        {
          canTakeApprenticeship: Boolean(queryData.canTakeApprenticeship),
        },
      );
    }

    if (queryData.monthsOfCommercialExp) {
      queryBuilder.andWhere(
        'student.monthsOfCommercialExp >= :monthsOfCommercialExp',
        {
          monthsOfCommercialExp: Number(queryData.monthsOfCommercialExp),
        },
      );
    }

    if (queryData.minSalary && queryData.maxSalary) {
      queryBuilder.andWhere(
        'student.expectedSalary BETWEEN :minSalary AND :maxSalary',
        {
          minSalary: Number(queryData.minSalary),
          maxSalary: Number(queryData.maxSalary),
        },
      );
    }
    return queryBuilder.getMany();
  }
}
