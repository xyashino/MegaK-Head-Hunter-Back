import { Expose, Transform } from 'class-transformer';
import { User } from '../entities/user.entity';
import { UserRole } from '../../enums/user-role.enums';
import { Hr } from '../../hr/entities/hr.entity';
import { Student } from '../../students/entities/student.entity';

export class ResponseUserDto implements Partial<User> {
  @Expose()
  email: string;
  @Expose()
  isActive: boolean;
  @Expose()
  role: UserRole;

  @Expose()
  @Transform(({ obj }) => {
    const { hr, student }: { hr: Hr | null; student: Student | null } = obj;
    if (hr) return { id: hr.id, fullName: hr.fullName };
    if (student)
      return {
        id: student.id,
        fullName: `${student.firstname} ${student.lastname}`,
        githubUsername: student.githubUsername
      };
    return null;
  })
  data: any;
}
