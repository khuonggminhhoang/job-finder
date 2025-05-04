import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from '@/config/config.service';
import { INestApplication } from '@nestjs/common';

export function initSwagger(app: INestApplication) {
  const SWAGGER = config.SWAGGER;
  const configSwagger = new DocumentBuilder()
    .setTitle(SWAGGER.TITLE)
    .setVersion(SWAGGER.VERSION)
    .setDescription(SWAGGER.DESCRIPTION)
    .setContact(
      SWAGGER.CONTACT.NAME,
      SWAGGER.CONTACT.URL,
      SWAGGER.CONTACT.EMAIL,
    )
    .addServer('http://localhost:' + config.PORT, 'Localhost')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('/apidoc', app, document, {
    customSiteTitle: config.SWAGGER.CUSTOM.SITE_TITLE,
    swaggerOptions: {
      persistAuthorization: true, // giữ lại token khi load lại trang swagger
    },
  });
}
