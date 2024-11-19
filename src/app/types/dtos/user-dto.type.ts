export type UserDto = {
  id: number;
  name: string;
  email: string;
  role: number;
  verified_at: Date | null;
  created_at: Date;
  updated_at: Date;
  access_token?: string;
};
