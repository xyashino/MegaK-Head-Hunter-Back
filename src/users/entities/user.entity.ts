import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from '../../common/enums/user-role.enums';
import { Hr } from '../../hr/entities/hr.entity';
import { Student } from 'src/students/entities/student.entity';
import { UserStatus } from '../../common/enums/user-status.enums';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: UserRole,
  })
  role: string;

  @Column({
    nullable: true,
  })
  hashedPassword?: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isActive: UserStatus;

  @Column({
    nullable: true,
    default: null,
  })
  currentTokenId: string | null;

  @Column({
    nullable: true,
    default: null,
  })
  resetPasswordToken: string | null;

  @OneToOne(() => Hr, (hr) => hr.user)
  hr: Hr;

  @OneToOne(() => Student, (student) => student.user)
  student: Student;
}
