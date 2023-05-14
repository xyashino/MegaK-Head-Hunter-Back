import {ActiveStudentResponse , HrResponseData} from "../index";

export interface InterviewResponse {
  id: string;
  createdAt: Date;
  bookingDate: Date;
}

export interface InterviewRelationResponse {
  student: ActiveStudentResponse;
  hr: Omit<HrResponseData, 'email' | 'userId' | 'isActive' >
}