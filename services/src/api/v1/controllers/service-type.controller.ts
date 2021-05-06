import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ServiceType } from '../typings';

@Controller('type')
export class ServiceTypeController {
  private readonly logger = new Logger('SERVICES CONTROLLER V1', true);
  constructor(
    @Inject('SERVICES_SERVICE') private readonly servicesClient: ClientProxy,
  ) {}

  @Get()
  public async getAll() {
    this.logger.log('getAll start');
    try {
      const services = await this.servicesClient
        .send('UD.Services.Type', {})
        .toPromise<ServiceType[]>();
      return services;
    } catch (error) {
      this.logger.error(error);
      throw error;
    } finally {
      this.logger.log('getAll end');
    }
  }
}
