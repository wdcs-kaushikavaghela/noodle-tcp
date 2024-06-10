import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from '../products/products.module';
import { DataBaseModule, EnvConfigModule } from 'utils/common/src';

@Module({
  imports: [ProductsModule, EnvConfigModule,DataBaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
