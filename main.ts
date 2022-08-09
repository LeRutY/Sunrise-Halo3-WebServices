import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SunriseModule } from './src/sunrise.module';
import PresentationSettings from 'src/infrastructure/presentation/settings/PresentationSettings';

async function bootstrap() {
  const app = await NestFactory.create(SunriseModule);

  const config = new DocumentBuilder()
    .setTitle('Sunrise')
    .setDescription('Halo 3 Web API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  await app.listen(new PresentationSettings().get().port);
}
bootstrap();
