import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { initSwagger } from '@/base/swagger/swagger.setup';
import { config } from '@/config/config.service';
import { ResponseTransformInterceptor } from '@/base/middleware/response.interceptor';
import { HttpExceptionFilter } from '@/base/middleware/http-exception.filter';
import { UnknownExceptionFilter } from '@/base/middleware/unknow-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(
    helmet({
      crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
      transform: true, // config transform once
    }),
  );
  app.useGlobalFilters(new UnknownExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.setGlobalPrefix(config.PREFIX);
  initSwagger(app);
  await app.listen(config.PORT ?? 3001, '0.0.0.0');
}
void bootstrap();
