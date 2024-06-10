/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const globalPrefix = 'api';
  // app.setGlobalPrefix(globalPrefix);
      app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.TCP,
        options:{
          port:3001
        }
      });

  await app.startAllMicroservices();
  await app.listen(5001);

  Logger.log(
    `🚀 Application is running on: http://localhost:${5001}(http) and 3001 TCP}`
  );
}

bootstrap();
