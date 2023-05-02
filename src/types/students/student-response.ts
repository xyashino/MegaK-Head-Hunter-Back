import { ActiveStudentResponse } from './active-student-response';
import { InactiveStudentResponse } from './inactive-student-response';

export interface BaseStudentResponse {
  id: string;
  courseCompletion: number;
  courseEngagement: number;
  projectDegree: number;
  teamProjectDegree: number;
  bonusProjectUrls: string[];
  expectedTypeWork: string;
  expectedContractType: string;
  canTakeApprenticeship: boolean;
  monthsOfCommercialExp: number;
  email?: string;
  userId?: string;
}

export type StudentResponse = ActiveStudentResponse | InactiveStudentResponse;
