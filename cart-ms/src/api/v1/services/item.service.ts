import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { Item } from '../db/entitys';
import { Item as ItemT } from '../typings';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
  ) {}

  public async add({
    itemId,
    userId,
    cartId,
    serviceId,
    serviceTypeId,
    count,
  }: ItemT.AddService) {
    const id = uuidv4();
    count = count || 1;
    try {
      await this.itemRepository.insert({
        id,
        count,
        userId,
        cartId,
        itemId,
        serviceId,
        serviceTypeId,
      });
      return id;
    } catch (error) {
      throw error;
    }
  }
}
