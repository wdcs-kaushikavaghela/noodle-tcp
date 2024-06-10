import { Body, Controller, Get, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { MessagePattern } from '@nestjs/microservices';
import { EmailService } from '@/libs/email/src/email.service';
import { CreateInviteDto, EmailDto } from '@/utils/dtos/src';
import { CreateOrgUserDto } from '../dtos/create-org-user.dto';
import { ERROR_MESSAGES, errorHandler } from '@/utils/common/src';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly emailService: EmailService,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @MessagePattern({ cmd: 'get_user_by_id' })
  async getUserById(id: string) {
    return this.userService.findById(id);
  }

  @Get('/:id')
  async getOneUserById(@Param('id') id: string) {
    return this.userService.findById(id);
  }


  @Post('email')
  async sendEmail(@Body() emailDto: EmailDto): Promise<void> {
    const { to, subject, body } = emailDto;
    await this.emailService.sendEmail({ to, subject, body });
  }

  @Post('invite')
  async createInvite(@Body() createInviteDto: CreateInviteDto) {
    const { email, organizationId } = createInviteDto;
    return this.userService.inviteOrgUser(email, organizationId);
  }

  @Post('register-org-user')
  async register(
    @Query('token') token: string,
    @Body() registerDto: CreateOrgUserDto
  ): Promise<{ status: number; message: string; }> {
    const invite = await this.userService.validateInvite(token);
    if (!invite) {
        return errorHandler(
          HttpStatus.BAD_REQUEST,
         ERROR_MESSAGES.INVALID_TOKEN
        );
    }

    return this.userService.createOrgUser(
      registerDto,
      invite.organizationId
    );
  }
}
