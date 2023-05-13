import {ActiveStudentResponse , HrResponseData} from "@types";

export interface InterviewResponse {
  id: string;
  createdAt: Date;
  bookingDate: Date;
}
export interface InterviewRelationResponse {
  student: ActiveStudentResponse;
  hr: Omit<HrResponseData, 'email' | 'userId' | 'isActive' >
}