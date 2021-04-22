import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cloth } from '../db/entitys';

@Injectable()
export class ClothService {
  constructor(
    @InjectRepository(Cloth)
    private readonly clothRepository: Repository<Cloth>,
  ) {}

  public async findAll() {
    try {
      const cloths = await this.clothRepository.find();
      return cloths;
    } catch (error) {
      throw error;
    }
  }

  public async findById(id: string) {
    try {
      const cloth = await this.clothRepository.findOne({ where: { id } });
      return cloth;
    } catch (error) {
      throw error;
    }
  }
}
