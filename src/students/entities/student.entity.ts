import { StudentContactType } from 'src/enums/student-contract-type.enums';
import { StudentStatus } from 'src/enums/student-status.enums';
import { StudentTypeWork } from 'src/enums/students-type-work.enums';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'decimal',
    precision: 3,
    scale: 2,
    default: 0,
  })
  courseCompletion: number;

  @Column({
    type: 'decimal',
    precision: 3,
    scale: 2,
    default: 0,
  })
  courseEngagement: number;

  @Column({
    type: 'decimal',
    precision: 3,
    scale: 2,
    default: 0,
  })
  projectDegree: number;

  @Column({
    type: 'decimal',
    precision: 3,
    scale: 2,
    default: 0,
  })
  teamProjectDegree: number;

  @Column('simple-array')
  bonusProjectUrls: string[];

  @Column({
    length: 20,
    nullable: true,
  })
  tel: string;

  @Column({
    length: 255,
  })
  firstName: string;

  @Column({
    length: 255,
  })
  lastName: string;

  @Column({
    length: 255,
  })
  githubUsername: string;

  @Column('simple-array')
  portfolioUrls: string[];

  @Column('simple-array')
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

  // static findByUserId(userId: string) {
  //   return this.createQueryBuilder('student')
  //     .where('student.userId = :userId', { userId })
  //     .getOne();
  // }
}
