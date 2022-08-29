import { IsNotEmpty, IsString } from 'class-validator';

export class AuthAdminDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
