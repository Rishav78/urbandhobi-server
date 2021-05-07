import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import { PickupTiming } from '../entitys';
import data from '../../../../data/pickup-timing';

export default class CreatePets implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.createQueryBuilder().delete().from(PickupTiming).execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(PickupTiming)
      .values(data)
      .execute();
  }
}
