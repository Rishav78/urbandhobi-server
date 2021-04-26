import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Services } from '../db/entitys';

@Injectable()
export class ServicesService {
  private readonly logger: Logger = new Logger('SERVICES SERVICE', true);
  constructor(
    @InjectRepository(Services)
    private readonly servicesRepository: Repository<Services>,
  ) {}

  public async findAll() {
    this.logger.log('findAll start');
    try {
      const services = await this.servicesRepository.find();
      return services;
    } catch (error) {
      throw error;
    } finally {
      this.logger.log('findAll end');
    }
  }
}
