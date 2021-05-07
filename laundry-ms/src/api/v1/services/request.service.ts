import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Request } from '../db/entitys';
import { v4 as uuidv4 } from 'uuid';

interface AddArgs {
  cartId: string;
  timingId: number;
  paymentMethod: 'cod';
}

@Injectable()
export class RequestService {
  private readonly logger: Logger = new Logger('REQUEST SERVICE', true);
  constructor(
    private connection: Connection,
    @InjectRepository(Request)
    private readonly requestRepository: Repository<Request>,
    @Inject('CART_SERVICE') private readonly cartClient: ClientProxy,
  ) {}

  public async add(
    { cartId, timingId, paymentMethod }: AddArgs,
    userId: string,
  ) {
    const id = uuidv4();
    try {
      if (this.findByCartId(cartId)) {
        throw new BadRequestException('cart has already been submited');
      }
      // mark cart submit if not already
      this.cartClient.emit('UD.Cart.Submit', { userId, cartId });
      await this.requestRepository.insert({
        id,
        cartId,
        timingId,
        paymentMethod,
        userId,
      });
      return id;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async findByCartId(cartId: string) {
    try {
      const request = await this.requestRepository.findOne({
        where: { cartId },
      });
      return request;
    } catch (error) {
      throw error;
    }
  }
}
