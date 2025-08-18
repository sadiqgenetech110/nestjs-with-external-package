import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
  });
  app.useStaticAssets(join(__dirname, '..', "uploads"), {
    prefix: "uploads",
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,            // Strip properties not in the DTO
    forbidNonWhitelisted: true, // Throw error if unknown property
    transform: true,            // Automatically transform payloads to DTO instances
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
