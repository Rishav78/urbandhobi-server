import { Logger, QueryRunner } from 'typeorm';
import { Logger as NestLogger } from '@nestjs/common';
export class CustomLogger implements Logger {
  private readonly logger: NestLogger = new NestLogger();
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    this.logger.log(`${query}, ${JSON.stringify(parameters || {}, null, 2)}`);
  }
  logQueryError(
    error: string | Error,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    this.logger.error(
      `${error}, ${query}, ${JSON.stringify(parameters || {}, null, 2)}`,
    );
  }
  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    this.logger.warn(
      `${time} ${query}, ${JSON.stringify(parameters || {}, null, 2)}`,
    );
  }
  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    this.logger.log(message);
  }
  logMigration(message: string, queryRunner?: QueryRunner) {
    this.logger.log(message);
  }
  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
    switch (level) {
      case 'log':
      case 'info':
        this.logger.log(message);
        break;
      case 'warn':
        this.logger.warn(message);
        break;
      default:
        this.logger.error(message);
    }
  }
}
