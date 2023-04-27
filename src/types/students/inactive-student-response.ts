import { BaseStudentResponse } from './student-response';

export interface InactiveStudentResponse extends BaseStudentResponse {
  tel: null;
  firstname: null;
  lastname: null;
  githubUsername: null;
  portfolioUrls: null;
  projectUrls: null;
  bio: null;
  targetWorkCity: null;
  expectedSalary: null;
  education: null;
  workExperience: null;
  courses: null;
  isActive: false;
}
