import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';
import { HttpException } from 'src/lib/helpers';
import { Iterator } from 'src/lib/utils/iterator.util';
import { ClothService } from '../services';

@Controller()
export class ClothController {
  constructor(
    private readonly clothService: ClothService,
    private readonly iterator: Iterator,
  ) {}

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

  @MessagePattern('UD.Cloth.Exist')
  public async exist(
    @Ctx() context: RmqContext,
    @Payload() ids: string | string[],
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      if (typeof ids === 'string') {
        ids = [ids];
      }
      this.iterator.forEach(ids, async (id) => {
        if (!(await this.clothService.findById(id))) {
          throw new RpcException(
            new HttpException(`cloth with id ${ids} does not exist`, 404),
          );
        }
      });
      return true;
    } catch (error) {
      throw error;
    } finally {
      channel.ack(originalMsg);
    }
  }
}
