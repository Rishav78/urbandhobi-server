import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ServiceType } from '../typings';

@Controller('area')
export class ServiceAreaController {
  private readonly logger = new Logger('SERVICES AREA CONTROLLER V1', true);
  constructor(
    @Inject('SERVICES_SERVICE') private readonly servicesClient: ClientProxy,
  ) {}

  @Get('/country')
  public async getCountrys() {
    this.logger.log('getCountrys start');
    try {
      const countrys = await this.servicesClient
        .send('UD.Services.Area.GetCountrys', {})
        .toPromise<ServiceType[]>();
      return countrys;
    } catch (error) {
      this.logger.error(error);
      throw error;
    } finally {
      this.logger.log('getCountrys end');
    }
  }

  @Get('/state')
  public async getStates() {
    this.logger.log('getCountrys start');
    try {
      const states = await this.servicesClient
        .send('UD.Services.Area.GetStates', {})
        .toPromise<ServiceType[]>();
      return states;
    } catch (error) {
      this.logger.error(error);
      throw error;
    } finally {
      this.logger.log('getCountrys end');
    }
  }
}
