import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import { Services, ServiceType } from '../entitys';
import services from '../../../../data/services/services';
import servicetype from '../../../../data/services/service-type';

export default class CreatePets implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.createQueryBuilder().delete().from(Services).execute();
    await connection.createQueryBuilder().delete().from(ServiceType).execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(ServiceType)
      .values(servicetype)
      .execute();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Services)
      .values(services)
      .execute();
  }
}
