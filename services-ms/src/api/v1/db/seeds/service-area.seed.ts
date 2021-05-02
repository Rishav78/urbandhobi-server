import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import { ServiceCountry, ServiceState } from '../entitys';
import state from '../../../../data/service-area/state';
import country from '../../../../data/service-area/country';

export default class CreatePets implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    // delete data if already exist
    await connection.createQueryBuilder().delete().from(ServiceState).execute();
    await connection
      .createQueryBuilder()
      .delete()
      .from(ServiceCountry)
      .execute();

    // insert data
    await connection
      .createQueryBuilder()
      .insert()
      .into(ServiceCountry)
      .values(country)
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(ServiceState)
      .values(state)
      .execute();
  }
}
