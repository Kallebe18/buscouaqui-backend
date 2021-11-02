import { Module } from '@nestjs/common';
import { databaseProviders, resultsProviders } from './providers';

@Module({
  providers: [...databaseProviders, ...resultsProviders],
  exports: [...databaseProviders, ...resultsProviders],
})
export class DatabaseModule {}
