import { UserDto } from '@Types/dtos/user-dto.type';

export type RegisterResponse = Omit<UserDto, 'access_token'>;
