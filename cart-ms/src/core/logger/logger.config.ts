import * as path from 'path';
import * as winston from 'winston';
import { WinstonModuleOptions, utilities } from 'nest-winston';
import { ROOT_DIR } from '../config';

export const loggerConfig: WinstonModuleOptions = {
  exitOnError: false,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        utilities.format.nestLike(),
      ),
    }),
    new winston.transports.File({
      dirname: path.join(ROOT_DIR, 'logs'),
      filename: 'ud-cart-api.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        utilities.format.nestLike(),
      ),
    }),
  ],
};
