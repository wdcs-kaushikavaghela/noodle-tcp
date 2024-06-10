import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Create a TCP microservice
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options:{port:3000}
  });

  await app.startAllMicroservices();
  await app.listen(5000);

  Logger.log(`🚀 Application is running on: http://localhost:5000(htttp) and 3000 tcp`);
}

bootstrap();
