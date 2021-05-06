import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceType } from '../db/entitys';

@Injectable()
export class ServiceTypeService {
  private readonly logger: Logger = new Logger('SERVICES TYPE SERVICE', true);
  constructor(
    @InjectRepository(ServiceType)
    private readonly serviceTypeRepository: Repository<ServiceType>,
  ) {}

  public async findAll() {
    this.logger.log('findAll start');
    try {
      const serviceTypes = await this.serviceTypeRepository.find({
        relations: ['services'],
      });
      return serviceTypes;
    } catch (error) {
      throw error;
    } finally {
      this.logger.log('findAll end');
    }
  }
}
