import {
  BaseEntity,
  BeforeInsert,
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

  @Column({
    type: 'timestamp',
    default: null,
  })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: null,
  })
  booking_date: Date;

  @ManyToOne(() => Hr, (hr) => hr.interviews)
  @JoinColumn()
  hr: Hr;

  @ManyToOne(() => Student, (student) => student.interviews)
  @JoinColumn()
  student: Student;

  @BeforeInsert()
  setDate() {
    const tenDaysInMs = 10 * 24 * 60 * 60 * 1000;
    this.created_at = new Date();
    this.booking_date = new Date(this.created_at.getTime() + tenDaysInMs);
  }
}
