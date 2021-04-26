import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import { ServiceType } from '../entitys';
import servicetype from '../../../../data/services/service-type';

export default class CreatePets implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.createQueryBuilder().delete().from(ServiceType).execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(ServiceType)
      .values(servicetype)
      .execute();
  }
}
