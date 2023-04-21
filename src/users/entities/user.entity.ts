import {BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {UserRole} from "../../enums/user-role.enums";
import {Hr} from "../../hr/entities/hr.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column(
      {
        type:"enum",
        enum: UserRole,
      }
  )
  role: UserRole;

  @Column()
  hashedPassword: string;

  @Column({
    nullable: true,
    default: null,
  })
  currentTokenId: string | null;

  @OneToOne(() => Hr, hr => hr.user)
  hr: Hr;
}
