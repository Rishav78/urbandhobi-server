import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { ClothService } from '../services';

@Controller()
export class ClothController {
  constructor(private readonly clothService: ClothService) {}

  @MessagePattern('UD.Cloth.FindAll')
  public async findAll(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      const clothes = await this.clothService.findAll();
      return clothes;
    } catch (error) {
      throw error;
    } finally {
      channel.ack(originalMsg);
    }
  }
}
