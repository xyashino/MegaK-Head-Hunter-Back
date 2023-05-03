interface StudentInfo {
  id: string;
  firstname: string;
  lastname: string;
}

export interface MailContext {
  registrationLink?: string;
  resetPasswordLink?: string;
  studentInfo: StudentInfo;
}
