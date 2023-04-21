import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../../enums/user-role.enums';

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

  @Column()
  hashedPassword: string;

  @Column({
    nullable: true,
    default: null,
  })
  currentTokenId: string | null;
}
