import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { loggerConfig } from './logger.config';

@Module({
  imports: [WinstonModule.forRoot(loggerConfig)],
})
export class LoggerModule {}
