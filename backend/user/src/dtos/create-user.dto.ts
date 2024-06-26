// create-user.dto.ts
import { IsString, IsEmail } from 'class-validator';


export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  companyName: string;

  @IsString()
  contactNumber: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
