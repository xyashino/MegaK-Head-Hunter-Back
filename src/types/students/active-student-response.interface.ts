import { BaseStudentResponse } from './student-response.interface';

export interface ActiveStudentResponse extends BaseStudentResponse {
  githubUsername: string;
  portfolioUrls: string[];
  projectUrls: string[];
  isActive: true;
  bio: string | null;
  targetWorkCity: string | null;
  expectedSalary: number | null;
  education: string | null;
  workExperience: string | null;
  courses: string[] | null;
  tel:string | null;
  firstname:string;
  lastname:string
}
