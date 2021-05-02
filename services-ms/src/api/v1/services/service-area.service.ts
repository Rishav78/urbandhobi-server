import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceCountry, ServiceState } from '../db/entitys';

@Injectable()
export class ServiceAreaService {
  private readonly logger: Logger = new Logger('SERVICES AREA SERVICE', true);
  constructor(
    @InjectRepository(ServiceCountry)
    private readonly countryRepository: Repository<ServiceCountry>,
    @InjectRepository(ServiceState)
    private readonly stateRepository: Repository<ServiceState>,
  ) {}

  public async findStates() {
    try {
      const states = await this.stateRepository.find();
      return states;
    } catch (error) {
      throw error;
    }
  }

  public async findCountrys() {
    try {
      const countrys = await this.countryRepository.find();
      return countrys;
    } catch (error) {
      throw error;
    }
  }
}
