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
export class Hr extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  fullName: string;

  @Column()
  company: string;

  @Column({
    default: false,
  })
  isActive: boolean;

  @Column({ type: 'int', nullable: false, unsigned: true, width: 2 })
  maxReservedStudents: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  static findByUserId(userId: string) {
    return this.createQueryBuilder("hr")
        .where("hr.userId = :userId", { userId })
        .getOne()
  }
}
