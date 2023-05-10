import { StudentTypeWork } from '../../enums/students-type-work.enums';
import { StudentContactType } from '../../enums/student-contract-type.enums';

export interface Filtration {
  courseCompletion: number | string;
  courseEngagement: number | string;
  projectDegree: number | string;
  teamProjectDegree: number | string;
  expectedTypeWork: StudentTypeWork | string;
  expectedContractType: StudentContactType | string;
  minSalary: number | string;
  maxSalary: number | string;
  canTakeApprenticeship: number | string;
  monthsOfCommercialExp: number | string;
}
