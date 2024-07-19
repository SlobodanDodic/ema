import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  // app.use(cors({ credentials: true, origin: true }));
  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:5173',
    }),
  );
  await app.listen(3000);
}
bootstrap();
