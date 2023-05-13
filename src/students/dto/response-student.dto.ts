import { Expose, Transform } from 'class-transformer';
import { Student } from '../entities/student.entity';
import { StudentStatus } from '@enums/student-status.enums';
import { StudentContactType } from '@enums/student-contract-type.enums';

export class ResponseStudentDto implements Partial<Student> {
  @Expose()
  id: string;

  @Expose()
  @Transform(({ obj }) => obj.user.isActive)
  isActive: boolean;

  @Expose()
  @Transform(({ obj }) => obj.user.email)
  email: string;

  @Expose()
  @Transform(({ obj }) => obj.user.id)
  userId: string;

  @Expose()
  courseCompletion: number;

  @Expose()
  courseEngagement: number;

  @Expose()
  projectDegree: number;

  @Expose()
  teamProjectDegree: number;

  @Expose()
  bonusProjectUrls: string[];

  @Expose()
  tel: null | string;

  @Expose()
  firstname: null | string;

  @Expose()
  lastname: null | string;

  @Expose()
  githubUsername: null | string;
  @Expose()
  portfolioUrls: null | string[];
  @Expose()
  projectUrls: null | string[];

  @Expose()
  bio: null | string;

  @Expose()
  courses: string;

  @Expose()
  education: string;

  @Expose()
  workExperience: string;

  @Expose()
  expectedTypeWork;

  @Expose()
  targetWorkCity: string;

  @Expose()
  expectedSalary: string;

  @Expose()
  expectedContractType: StudentContactType;

  @Expose()
  status: StudentStatus;

  @Expose()
  canTakeApprenticeship: boolean;
}
