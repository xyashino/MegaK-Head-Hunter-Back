import { Injectable } from '@nestjs/common';
import { SearchOptionsDto } from 'src/common/dtos/page/search-options.dto';

@Injectable()
export class FiltrationService {
  async filterStudentPreferences(queryData: SearchOptionsDto, queryBuilder) {
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
      queryBuilder.andWhere('student.projectDegree >= :projectDegree', {
        projectDegree: queryData.projectDegree,
      });
    }

    if (queryData.teamProjectDegree) {
      queryBuilder.andWhere('student.teamProjectDegree >= :teamProjectDegree', {
        teamProjectDegree: queryData.teamProjectDegree,
      });
    }

    if (queryData.expectedTypeWork) {
      if (Array.isArray(queryData.expectedTypeWork)) {
        queryBuilder.andWhere(
          'student.expectedTypeWork IN (:...expectedTypeWork)',
          {
            expectedTypeWork: queryData.expectedTypeWork,
          },
        );
      } else if (typeof queryData.expectedTypeWork === 'string') {
        queryBuilder.andWhere('student.expectedTypeWork = :expectedTypeWork', {
          expectedTypeWork: queryData.expectedTypeWork,
        });
      }
    }

    if (queryData.expectedContractType) {
      if (Array.isArray(queryData.expectedContractType)) {
        queryBuilder.andWhere(
          'student.expectedContractType IN (:...expectedContractType)',
          {
            expectedContractType: queryData.expectedContractType,
          },
        );
      } else if (typeof queryData.expectedContractType === 'string') {
        queryBuilder.andWhere(
          'student.expectedContractType = :expectedContractType',
          {
            expectedContractType: queryData.expectedContractType,
          },
        );
      }
    }

    if (queryData.minSalary) {
      queryBuilder.andWhere('student.expectedSalary >= :minSalary', {
        minSalary: queryData.minSalary,
      });
    }

    if (queryData.maxSalary) {
      queryBuilder.andWhere(
        'student.expectedSalary <= :maxSalary OR student.expectedSalary IS NULL',
        {
          maxSalary: queryData.maxSalary,
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

    if (queryData.canTakeApprenticeship !== undefined) {
      if (queryData.canTakeApprenticeship === 0) {
        queryBuilder.andWhere(
          'student.canTakeApprenticeship = :canTakeApprenticeship',
          {
            canTakeApprenticeship: false,
          },
        );
      } else {
        queryBuilder.andWhere(
          'student.canTakeApprenticeship = :canTakeApprenticeship',
          {
            canTakeApprenticeship: queryData.canTakeApprenticeship,
          },
        );
      }
    }

    if (queryData.monthsOfCommercialExp) {
      queryBuilder.andWhere(
        'student.monthsOfCommercialExp >= :monthsOfCommercialExp',
        {
          monthsOfCommercialExp: queryData.monthsOfCommercialExp,
        },
      );
    }

    if (queryData.name) {
      queryBuilder.andWhere(
        'student.firstname LIKE :name OR student.lastname LIKE :name',
        {
          name: `%${queryData.name}%`,
        },
      );
    }
    return queryBuilder;
  }
}
