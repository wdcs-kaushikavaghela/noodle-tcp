import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InviteSchema, UserSchema } from 'schemas';
import { EmailModule } from '@/libs/email/src';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Invite', schema: InviteSchema }]),
    EmailModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
