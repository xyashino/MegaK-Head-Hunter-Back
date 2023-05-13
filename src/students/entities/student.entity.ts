import { StudentContactType } from '@enums/student-contract-type.enums';
import { StudentStatus } from '@enums/student-status.enums';
import { StudentTypeWork } from '@enums/students-type-work.enums';
import { User } from '@users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Interview } from '@interview/entities/interview.entity';

@Entity()
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'float',
    precision: 3,
    scale: 2,
  })
  courseCompletion: number;

  @Column({
    type: 'float',
    precision: 3,
    scale: 2,
  })
  courseEngagement: number;

  @Column({
    type: 'float',
    precision: 3,
    scale: 2,
  })
  projectDegree: number;

  @Column({
    type: 'float',
    precision: 3,
    scale: 2,
  })
  teamProjectDegree: number;

  @Column({
    type: 'simple-array',
  })
  bonusProjectUrls: string[];

  @Column({
    length: 20,
    nullable: true,
  })
  tel: string;

  @Column({
    length: 255,
    nullable: true,
  })
  firstname: string;

  @Column({
    length: 255,
    nullable: true,
  })
  lastname: string;

  @Column({
    length: 255,
    nullable: true,
  })
  githubUsername: string;

  @Column({
    type: 'simple-array',
    nullable: true,
  })
  portfolioUrls: string[];

  @Column({
    type: 'simple-array',
    nullable: true,
  })
  projectUrls: string[];

  @Column({
    length: 255,
    nullable: true,
  })
  bio: string;

  @Column({
    type: 'enum',
    enum: StudentTypeWork,
    default: StudentTypeWork.IRRELEVANT,
  })
  expectedTypeWork: StudentTypeWork;

  @Column({
    length: 255,
    nullable: true,
  })
  targetWorkCity: string;

  @Column({
    type: 'enum',
    enum: StudentContactType,
    default: StudentContactType.NOPREFERENCE,
  })
  expectedContractType: StudentContactType;

  @Column({
    length: 255,
    nullable: true,
  })
  expectedSalary: string;

  @Column({
    default: false,
  })
  canTakeApprenticeship: boolean;

  @Column({
    default: 0,
  })
  monthsOfCommercialExp: number;

  @Column({
    type: 'longtext',
    nullable: true,
  })
  education: string;

  @Column({
    type: 'longtext',
    nullable: true,
  })
  workExperience: string;

  @Column({
    type: 'longtext',
    nullable: true,
  })
  courses: string;

  @Column({
    type: 'enum',
    enum: StudentStatus,
  })
  status: StudentStatus;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => Interview, (interview) => interview.student)
  interviews: Interview[];
}
