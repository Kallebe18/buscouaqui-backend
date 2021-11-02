import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Browser } from 'puppeteer';
import { AppModule } from './app.module';
import { startBrowser } from './scrappers';

export let scrappersBrowser = null as Browser;

async function bootstrap() {
  scrappersBrowser = await startBrowser();

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();
