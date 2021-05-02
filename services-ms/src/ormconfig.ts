import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import { CustomLogger } from './lib/utils';

const config: TypeOrmModuleOptions & { seeds?: string[] } = {
  type: 'postgres',
  host: 'ud-postgres',
  port: 5432,
  username: 'app_user',
  password: 'app_password',
  database: 'ud_user',
  entities: [
    path.join(__dirname, 'api', 'v1', 'db', 'entitys/**/**.entity.{ts,js}'),
  ],
  seeds: [path.join(__dirname, 'api', 'v1', 'db', 'seeds/**/*.seed.{ts,js}')],
  synchronize: true,
  logging: true,
  logger: new CustomLogger(),
};

export default config;
