import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { Cart } from '../db/entitys';
import { CreateServiceArgs } from '../typings/cart';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
  ) {}

  public async create({ userId, name }: CreateServiceArgs) {
    const id = uuidv4();
    try {
      await this.cartRepository.insert({ id, name, userId });
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
}
