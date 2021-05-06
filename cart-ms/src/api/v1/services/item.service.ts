import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Connection, Repository } from 'typeorm';
import { Item } from '../db/entitys';
import { Item as ItemT } from '../typings';
import { Iterator } from 'src/lib/utils/iterator.util';
import { RpcException } from '@nestjs/microservices';
import { HttpException } from 'src/lib/helpers';
import { CartService } from './cart.service';

@Injectable()
export class ItemService {
  private readonly logger: Logger = new Logger('ITEM SERVICE');
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    private readonly cartService: CartService,
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
  public async addItem(obj: ItemT.AddService, userId: string) {
    const id = uuidv4();
    try {
      const cart = await this.cartService.findByUserId(userId);
      await this.itemRepository.insert({ ...obj, userId, cartId: cart.id, id });
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
  public async addItems(obj: ItemT.AddService[], userId: string) {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const cart = await this.cartService.findByUserId(userId);
      await this.iterator.forEach(
        obj,
        async ({ serviceTypeId, itemId, serviceId, count }) => {
          count = typeof count === 'number' ? count : 1;
          if (count < 0) {
            throw new RpcException(
              new HttpException('count can not be negative', 400),
            );
          }
          const item = await this.itemRepository.findOne({
            where: { cartId: cart.id, itemId },
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
              itemId,
              userId,
              serviceId,
              serviceTypeId,
              count,
              cartId: cart.id,
            })
            .execute();
        },
      );
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   *
   * @param obj ItemT.AddService | ItemT.AddService[]
   * @returns boolean | string(item id)
   *
   * @description For multiple item return boolean else return item id
   */
  public async add(obj: ItemT.AddService | ItemT.AddService[], userId: string) {
    try {
      return await (Array.isArray(obj)
        ? this.addItems(obj, userId)
        : this.addItem(obj, userId));
    } catch (error) {
      throw error;
    }
  }

  public async findAll(cartId: string) {
    try {
      const items = await this.itemRepository.find({ where: { cartId } });
      return items;
    } catch (error) {
      throw error;
    }
  }

  public async findByUserId(userId: string) {
    try {
      const cart = await this.cartService.findByUserId(userId);
      const items = await this.findAll(cart.id);
      return items;
    } catch (error) {
      throw error;
    }
  }

  public async delete(id: string, cartId: string) {
    try {
      await this.itemRepository.softDelete({ id });
      return true;
    } catch (error) {
      throw error;
    }
  }
}
