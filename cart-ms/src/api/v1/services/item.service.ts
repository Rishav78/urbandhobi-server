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
    try {
      await this.itemRepository.insert(obj);
      return true;
    } catch (error) {
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
