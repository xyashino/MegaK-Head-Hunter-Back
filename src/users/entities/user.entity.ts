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

  @Column()
  pwdHash: string;

  @Column({
    nullable: true,
    default: null,
  })
  currentTokenId: string | null;

  @Column({
    nullable: false,
    type: 'enum',
    enum: UserRole,
  })
  role: string;

  @Column({
    nullable: true,
    default: null,
  })
  registerToken: string | null;

  @Column({
    nullable: true,
    default: null,
  })
  resetPwdToken: string | null;

  @Column({
    default: false,
    type: 'boolean',
  })
  isActive: boolean;
}
