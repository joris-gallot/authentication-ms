// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv-expand')(require('dotenv').config());
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RMQ_URL],
        queue: 'authentication_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  app.listen();

  const httpApp = await NestFactory.create(AppModule, { cors: true });
  httpApp.useGlobalPipes(new ValidationPipe());

  await httpApp.listen(process.env.PORT);
}
bootstrap();
