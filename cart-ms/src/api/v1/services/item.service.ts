import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Connection, Repository } from 'typeorm';
import { Item } from '../db/entitys';
import { Item as ItemT } from '../typings';
import { Iterator } from 'src/lib/utils/iterator.util';
import { RpcException } from '@nestjs/microservices';
import { HttpException } from 'src/lib/helpers';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    private readonly iterator: Iterator,
    private readonly connection: Connection,
  ) {}

  /**
   *
   * @param obj ItemT.AddService
   * @returns added item id
   *
   * @description add a single item
   */
  public async addItem(obj: ItemT.AddService) {
    const id = uuidv4();
    try {
      await this.itemRepository.insert({ ...obj, id });
      return id;
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param obj Array<ItemT.AddService>
   * @returns true when success
   *
   * @description add multiple items
   */
  public async addItems(obj: ItemT.AddService[]) {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      await this.iterator.forEach(
        obj,
        async ({ cartId, userId, serviceTypeId, itemId, serviceId, count }) => {
          count = typeof count === 'number' ? count : 1;
          if (count < 0) {
            throw new RpcException(
              new HttpException('count can not be negative', 400),
            );
          }
          const item = await this.itemRepository.findOne({
            where: { cartId, itemId },
          });
          if (item) {
            return await queryRunner.manager
              .createQueryBuilder(Item, 'item')
              .update(Item)
              .set({ count })
              .execute();
          }
          return await queryRunner.manager
            .createQueryBuilder(Item, 'item')
            .insert()
            .into(Item)
            .values({
              cartId,
              itemId,
              userId,
              serviceId,
              serviceTypeId,
              count,
            });
        },
      );
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }

  /**
   *
   * @param obj ItemT.AddService | ItemT.AddService[]
   * @returns boolean | string(item id)
   *
   * @description For multiple item return boolean else return item id
   */
  public async add(obj: ItemT.AddService | ItemT.AddService[]) {
    try {
      return await (Array.isArray(obj)
        ? this.addItems(obj)
        : this.addItem(obj));
    } catch (error) {
      throw error;
    }
  }
}
