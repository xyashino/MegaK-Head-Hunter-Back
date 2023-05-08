import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Interview } from '../../interview/entities/interview.entity';

@Entity()
export class Hr extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column()
  company: string;

  @Column({ type: 'int', nullable: false, unsigned: true, width: 2 })
  maxReservedStudents: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => Interview, (interview) => interview.hr)
  interviews: Interview[];
}
