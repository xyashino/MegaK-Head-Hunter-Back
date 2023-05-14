import {
  ExpectedContractTypeEnum,
  ExpectedTypeWorkEnum,
  StatusTypeEnum,
} from '../EnumTypes';

export interface StudentUpdateRequest {
  email?: string;

  tel?: string;

  firstname?: string;

  lastname?: string;

  githubUsername?: string;

  portfolioUrls?: string[];

  projectUrls?: string[];

  bio?: string;

  expectedTypeWork?: ExpectedTypeWorkEnum;

  targetWorkCity?: string;

  expectedContractType?: ExpectedContractTypeEnum;

  expectedSalary?: string;

  canTakeApprenticeship?: boolean;

  monthsOfCommercialExp?: number;

  education?: string;

  workExperience?: string;

  courses?: string;

  status?: StatusTypeEnum;
}
