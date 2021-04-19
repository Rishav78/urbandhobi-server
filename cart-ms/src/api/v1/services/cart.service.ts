import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { Cart } from '../db/entitys';
import { Cart as CartT } from '../typings';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
  ) {}

  public async create({ userId, name }: CartT.CreateServiceArgs) {
    const id = uuidv4();
    try {
      await this.cartRepository.insert({ id, name, userId });
      return id;
    } catch (error) {
      throw error;
    }
  }
}
