// create-user.dto.ts
import { IsString, IsEmail } from 'class-validator';

export class CreateInviteDto {
  @IsEmail()
  email: string;

  @IsString()
  organizationId: string;

  constructor(email: string, organizationId: string) {
    this.email = email;
    this.organizationId = organizationId;
  }
}
