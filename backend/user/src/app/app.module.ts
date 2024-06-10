import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataBaseModule, EnvConfigModule } from 'utils/common/src';
import { UsersModule } from '../users/users.module';


@Module({
  imports: [EnvConfigModule ,DataBaseModule,UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
