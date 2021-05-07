import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PickupTiming } from '../db/entitys';

@Injectable()
export class TimingService {
  private readonly logger: Logger = new Logger('SERVICES AREA SERVICE', true);
  constructor(
    @InjectRepository(PickupTiming)
    private readonly timingRepository: Repository<PickupTiming>,
  ) {}

  public async findAll() {
    try {
      const timings = await this.timingRepository.find();
      return timings;
    } catch (error) {
      throw error;
    }
  }
}
