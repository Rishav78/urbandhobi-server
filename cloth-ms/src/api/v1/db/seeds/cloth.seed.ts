import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import { Cloth } from '../entitys';
import cloths from '../../../../data/supportedClothes';

export default class CreatePets implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.createQueryBuilder().delete().from(Cloth).execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(Cloth)
      .values(cloths as any)
      .execute();
  }
}
