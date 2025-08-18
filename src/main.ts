import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', "uploads"), {
    prefix: "uploads",
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,            // Strip properties not in the DTO
    forbidNonWhitelisted: true, // Throw error if unknown property
    transform: true,            // Automatically transform payloads to DTO instances
  }));
  // Allow CORS
  app.enableCors({
    origin: [
      // "http://localhost:3000", // if you run frontend on same machine 
      // "http://127.0.0.1:3000",
      "http://192.168.14.37:3030", // 👈 your frontend IP:port 
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
