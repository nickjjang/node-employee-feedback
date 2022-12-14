import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'typeorm';
import { AppModule } from './app.module';
import { UnprocessibleEntityExceptionFactory } from './validations/exception.factory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      skipUndefinedProperties: true,
      skipNullProperties: true,
      exceptionFactory: UnprocessibleEntityExceptionFactory,
    }),
  );
  app.enableCors();

  await app.listen(parseInt(process.env.PORT, 10) || 3000, () => {
    console.log(`Server started: http://localhost:${process.env.PORT}`);
  });
}
bootstrap();
