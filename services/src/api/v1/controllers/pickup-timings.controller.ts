import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Timing } from '../typings';

@Controller('timing')
export class TimingsController {
  private readonly logger = new Logger('SERVICES AREA CONTROLLER V1', true);
  constructor(
    @Inject('SERVICES_SERVICE') private readonly servicesClient: ClientProxy,
  ) {}

  @Get('pickup')
  public async getPickupTimings() {
    this.logger.log('getPickupTimings start');
    try {
      const timings = await this.servicesClient
        .send('UD.Services.PickupTiming', {})
        .toPromise<Timing[]>();
      return timings;
    } catch (error) {
      this.logger.error(error);
      throw error;
    } finally {
      this.logger.log('getPickupTimings end');
    }
  }
}
