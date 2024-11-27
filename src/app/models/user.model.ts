import { UserRole } from '@Enums/users/user-role.enum';
import { UserDto } from '@Types/dtos/user-dto.type';

export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public role: UserRole,
    public verified_at: Date | null,
    public created_at: Date,
    public updated_at: Date,
    public access_token?: string,
  ) {}

  static fromDto(dto: UserDto): User {
    return new User(
      dto.id,
      dto.name,
      dto.email,
      dto.role,
      dto.verified_at,
      dto.created_at,
      dto.updated_at,
      dto.access_token,
    );
  }
}
