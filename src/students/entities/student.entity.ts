import { StudentContactType } from 'src/enums/student-contract-type.enums';
import { StudentStatus } from 'src/enums/student-status.enums';
import { StudentTypeWork } from 'src/enums/students-type-work.enums';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    length: 20,
    nullable: true,
  })
  tel: string;

  @Column({
    length: 255,
  })
  firstname: string;

  @Column({
    length: 255,
  })
  lastname: string;

  @Column({
    length: 255,
    unique: true,
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
    default: false,
  })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: StudentStatus,
  })
  status: StudentStatus;
}
