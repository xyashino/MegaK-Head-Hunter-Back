import {ExpectedContractTypeEnum, ExpectedTypeWorkEnum} from "../EnumTypes";


export interface Filtration {
  courseCompletion: number | string;
  courseEngagement: number | string;
  projectDegree: number | string;
  teamProjectDegree: number | string;
  expectedTypeWork: ExpectedTypeWorkEnum | '';
  expectedContractType: ExpectedContractTypeEnum | '';
  minSalary: number | string;
  maxSalary: number | string;
  canTakeApprenticeship: number | string;
  monthsOfCommercialExp: number | string;
}
