import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Stefanini: develop on a Nestjs Backend')
    .setDescription('This API manages information about companies and their transfer on the server side.')
    .setVersion('1.0')
    .build();
  // app.enableCors({
  //   origin: 'http://localhost:5173',
  //   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  //   allowedHeaders: ['Content-Type', 'Authorization'],
  //   credentials: true,
  // });
  app.useGlobalPipes(
    new ValidationPipe(
      { transform: true, whitelist: true, forbidNonWhitelisted: true }
    )
  );
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-ui/doc', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
