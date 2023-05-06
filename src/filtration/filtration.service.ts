import { Injectable } from '@nestjs/common';
import { Student } from 'src/students/entities/student.entity';
import { DataSource } from 'typeorm';
import { FilterStudentDto } from './dto/filter-student.dto';

@Injectable()
export class FiltrationService {
  constructor(private readonly dataSource: DataSource) {}

  async filterStudentPreferences(
    queryData: FilterStudentDto,
  ): Promise<Student[]> {
    const queryBuilder = await this.dataSource
      .createQueryBuilder()
      .select('student')
      .from(Student, 'student');

    // sql queries

    if (queryData.courseCompletion) {
      queryBuilder.andWhere('student.courseCompletion >= :courseCompletion', {
        courseCompletion: queryData.courseCompletion,
      });
    }

    if (queryData.courseEngagement) {
      queryBuilder.andWhere('student.courseEngagement >= :courseEngagement', {
        courseEngagement: queryData.courseEngagement,
      });
    }

    if (queryData.projectDegree) {
      queryBuilder.andWhere('student.teamProjectDegree >= :teamProjectDegree', {
        projectDegree: queryData.projectDegree,
      });
    }

    if (queryData.teamProjectDegree) {
      queryBuilder.andWhere('student.teamProjectDegree >= :teamProjectDegree', {
        teamProjectDegree: queryData.teamProjectDegree,
      });
    }

    if (queryData.expectedTypeWork) {
      queryBuilder.andWhere('student.expectedTypeWork = :expectedTypeWork ', {
        expectedTypeWork: queryData.expectedTypeWork,
      });
    }

    if (queryData.expectedContractType) {
      queryBuilder.andWhere(
        'student.expectedContractType = :expectedContractType',
        {
          expectedContractType: queryData.expectedContractType,
        },
      );
    }

    if (queryData.minSalary && queryData.maxSalary) {
      queryBuilder.andWhere(
        'student.expectedSalary BETWEEN :minSalary AND :maxSalary',
        {
          minSalary: queryData.minSalary,
          maxSalary: queryData.maxSalary,
        },
      );
    }

    if (queryData.canTakeApprenticeship) {
      queryBuilder.andWhere(
        'student.canTakeApprenticeship = :canTakeApprenticeship',
        {
          canTakeApprenticeship: queryData.canTakeApprenticeship,
        },
      );
    }

    if (queryData.monthsOfCommercialExp) {
      queryBuilder.andWhere(
        'student.monthsOfCommercialExp >= :monthsOfCommercialExp',
        {
          monthsOfCommercialExp: queryData.monthsOfCommercialExp,
        },
      );
    }
    return queryBuilder.getMany();
  }
}
