import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Service } from '../typings';

@Controller()
export class ServicesController {
  private readonly logger = new Logger('SERVICES CONTROLLER V1', true);
  constructor(
    @Inject('SERVICES_SERVICE') private readonly servicesClient: ClientProxy,
  ) {}

  @Get('s')
  public async getAll() {
    this.logger.log('getAll start');
    try {
      const services = await this.servicesClient
        .send('UD.Services.Get', {})
        .toPromise<Service[]>();
      return services;
    } catch (error) {
      this.logger.error(error);
      throw error;
    } finally {
      this.logger.log('getAll end');
    }
  }
}
