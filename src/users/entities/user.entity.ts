import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from '../../enums/user-role.enums';
import { Hr } from '../../hr/entities/hr.entity';
import { Student } from '../../students/entities/student.entity';

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
    default: false,
    type: 'boolean',
  })
  isActive: boolean;

  @Column({
    nullable: true,
    default: null,
  })
  hashedPassword: string | null;

  @Column({
    nullable: true,
    default: null,
  })
  currentTokenId: string | null;

  @OneToOne(() => Hr, (hr) => hr.user)
  hr: Hr;

  @OneToOne(() => Student, (student) => student.user)
  student: Student;
}
