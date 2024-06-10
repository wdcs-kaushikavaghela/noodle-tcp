import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { Invite, User } from 'schemas';
import { EmailService } from '@/libs/email/src/email.service';
import { CreateOrgUserDto } from '../dtos/create-org-user.dto';
import { ERROR_MESSAGES, errorHandler, SUCCESS_MESSAGES, userRoles } from '@/utils/common/src';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Invite') private inviteModel: Model<Invite>,
    private readonly emailService: EmailService
  ) {}

  async findUserAndHashPassword(email:string,password:string){
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      return errorHandler(
        HttpStatus.CONFLICT,
        ERROR_MESSAGES.USER_EXIST
      )
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  async createUser(createUserDto: CreateUserDto) {
    const { email, password, ...otherDetails } = createUserDto;
    const hashedPassword = await this.findUserAndHashPassword(email,password)
    const createdUser = new this.userModel({
      email,
      password: hashedPassword,
      ...otherDetails,
    });
    createdUser.save();
    if (createdUser){
        return errorHandler(HttpStatus.CREATED,SUCCESS_MESSAGES.USER_CREATION_SUCCESS);
    }
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async validateInvite(token: string): Promise<Invite> {
    return this.inviteModel.findOne({ token });
  }

  async inviteOrgUser(email: string, organizationId: string) {
    const token = uuidv4();
    const invite = new this.inviteModel({ email, organizationId, token });
    const inviteLink = `https://localhost:2000/register?token=${token}`;
    const emailData = {
      to: email,
      subject: 'You are invited to join our platform',
      body: `click the link to register:${inviteLink}`,
    };
    await this.emailService.sendEmail(emailData);
    await invite.save();
    return invite;
  }

  async createOrgUser(registerDto: CreateOrgUserDto, organizationId:string) {
    const {email , password , ...otherDetails} = registerDto;
    const hashedPassword = await this.findUserAndHashPassword(email, password);
    const createdUser = new this.userModel({
      email,
      password: hashedPassword,
      role:userRoles.organizationUser,
      organizationId,
      ...otherDetails,
    });
    createdUser.save();
    return errorHandler(
      HttpStatus.CREATED,
      SUCCESS_MESSAGES.USER_CREATION_SUCCESS
    );
  }

}
