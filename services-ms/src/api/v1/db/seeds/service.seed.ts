import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import { Service } from '../entitys';
import services from '../../../../data/services/services';

export default class CreatePets implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.createQueryBuilder().delete().from(Service).execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(Service)
      .values(services)
      .execute();
  }
}
