import { Controller, Logger } from '@nestjs/common';
import { EventPattern, RmqContext, Ctx } from '@nestjs/microservices';
import { ServiceTypeService } from '../services';

@Controller()
export class ServiceTypeController {
  private readonly logger: Logger = new Logger('SERVICE TYPE CONTROLLER', true);
  constructor(private readonly serviceTypeService: ServiceTypeService) {}

  @EventPattern('UD.Services.Type')
  public async getAll(@Ctx() context: RmqContext) {
    this.logger.log('getAll start');
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      const services = await this.serviceTypeService.findAll();
      return services;
    } catch (error) {
      this.logger.error(error);
      throw error;
    } finally {
      channel.ack(originalMsg);
      this.logger.log('getAll end');
    }
  }
}
