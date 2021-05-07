import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Connection, QueryRunner, Repository } from 'typeorm';
import { Cart } from '../db/entitys';
import { CreateServiceArgs } from '../typings/cart';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    private readonly connection: Connection,
  ) {}

  public async create(
    { userId, name }: CreateServiceArgs,
    queryRunner?: QueryRunner,
  ) {
    const id = uuidv4();
    try {
      if (queryRunner) {
        await queryRunner.manager
          .createQueryBuilder(Cart, 'cart')
          .insert()
          .into(Cart)
          .values({ id, name, userId })
          .execute();
      } else {
        await this.cartRepository.insert({ id, name, userId });
      }
      return id;
    } catch (error) {
      throw error;
    }
  }

  public async findByUserId(userId: string) {
    try {
      const cart = await this.cartRepository.findOne({
        where: { userId, status: 'pending' },
      });
      return cart;
    } catch (error) {
      throw error;
    }
  }

  public async findById(id: string) {
    try {
      const cart = await this.cartRepository.findOne({
        where: { id, status: 'pending' },
      });
      return cart;
    } catch (error) {
      throw error;
    }
  }

  public async submit(userId: string) {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const cart = await this.findByUserId(userId);
      if (!cart) {
        throw new NotFoundException('cart does not exist');
      }
      await queryRunner.manager
        .createQueryBuilder(Cart, 'cart')
        .update()
        .set({ status: 'submited' })
        .where('id = :id', { id: cart.id })
        .execute();

      const res = await this.create({ userId }, queryRunner);

      await queryRunner.commitTransaction();

      return res;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
