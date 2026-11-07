import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );

  // FRONTEND_URL admite varios orígenes separados por coma.
  // También se aceptan los despliegues de vista previa del front en Vercel.
  const allowed = (process.env.FRONTEND_URL || 'http://localhost:3001')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  app.enableCors({
    origin: (origin, cb) => {
      if (
        !origin ||
        allowed.includes(origin) ||
        /^https:\/\/huellago[\w-]*\.vercel\.app$/.test(origin)
      ) {
        return cb(null, true);
      }
      return cb(new Error(`Origen no permitido: ${origin}`), false);
    },
    credentials: true,
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('HuellaGo API')
    .setDescription('API para la plataforma HuellaGo')
    .setVersion('0.1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalFilters(new GlobalExceptionFilter());

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`HuellaGo API running on port ${port}`);
}

bootstrap();
