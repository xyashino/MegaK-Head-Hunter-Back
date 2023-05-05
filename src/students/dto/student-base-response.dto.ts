import { Expose } from 'class-transformer';
import { StudentStatus } from '../../common/enums/student-status.enums';
import { StudentContactType } from '../../common/enums/student-contract-type.enums';
import { Student } from '../entities/student.entity';

export class ResponseBaseStudentDto implements Partial<Student> {
  @Expose()
  id: string;

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
  expectedTypeWork;

  @Expose()
  targetWorkCity: string;

  @Expose()
  expectedContractType: StudentContactType;

  @Expose()
  status: StudentStatus;

  @Expose()
  canTakeApprenticeship: boolean;
}
