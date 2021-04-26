import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Address as AddressT } from '../typings';
import { Address } from '../db/entitys';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  public async add(obj: AddressT.AddService) {
    const id = uuidv4();
    try {
      await this.addressRepository.insert({ ...obj, id });
      return id;
    } catch (error) {
      throw error;
    }
  }

  public async findById(id: string) {
    try {
      const address = await this.addressRepository.findOne({ where: { id } });
      return address;
    } catch (error) {
      throw error;
    }
  }

  public async findByUserId(userId: string) {
    try {
      const address = await this.addressRepository.find({ where: { userId } });
      return address;
    } catch (error) {
      throw error;
    }
  }
}
