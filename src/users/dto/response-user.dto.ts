import { Expose, Transform } from 'class-transformer';
import { User } from '../entities/user.entity';
import { UserRole } from '../../common/enums/user-role.enums';
import { Hr } from '../../hr/entities/hr.entity';
import { Student } from '../../students/entities/student.entity';
import { UserStatus } from '../../common/enums/user-status.enums';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto implements Partial<User> {
  @ApiProperty({
    description: 'The email of the user',
    example: 'john@gmail.com',
    format: 'email',
  })
  @Expose()
  email: string;
  @ApiProperty({
    description: 'The status of the user',
    example: false,
  })
  @Expose()
  isActive: UserStatus;
  @ApiProperty({
    description: 'The role of the user',
    example: 'admin',
  })
  @Expose()
  role: UserRole;

  @ApiProperty({
    description: 'Relations of the user',
    example: {
      id: 'b6367e08-01de-42b2-bf37-060c61176080',
      fullName: 'John Wick',
    },
  })
  @Expose()
  @Transform(({ obj }) => {
    const { hr, student }: { hr: Hr | null; student: Student | null } = obj;
    if (hr) return { id: hr.id, fullName: hr.fullName };
    if (student)
      return {
        id: student.id,
        fullName: `${student.firstname} ${student.lastname}`,
        githubUsername: student.githubUsername,
      };
    return null;
  })
  data: any;
}
