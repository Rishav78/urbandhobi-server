import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import { Services } from '../entitys';
import services from '../../../../data/services/services';

export default class CreatePets implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.createQueryBuilder().delete().from(Services).execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(Services)
      .values(services)
      .execute();
  }
}
