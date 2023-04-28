import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hr } from '../../hr/entities/hr.entity';
import { Student } from '../../students/entities/student.entity';

@Entity()
export class Interview extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Hr, (hr) => hr.interviews)
  @JoinColumn()
  hr: Hr;

  @ManyToOne(() => Student, (student) => student.interviews)
  @JoinColumn()
  student: Student;
}
