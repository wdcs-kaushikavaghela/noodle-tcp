// create-user.dto.ts
import { IsString, IsEmail } from 'class-validator';

export class CreateOrgUserDto {

  @IsString()
  companyName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
