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
  addressId: string;
  pickupDate: Date;
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
    { cartId, timingId, paymentMethod, addressId, pickupDate }: AddArgs,
    userId: string,
  ) {
    const id = uuidv4();
    try {
      if (await this.findByCartId(cartId)) {
        throw new BadRequestException('cart has already been submited');
      }
      // mark cart submited if not already
      this.cartClient.emit('UD.Cart.SubmitIfNot', { userId, id: cartId });
      await this.requestRepository.insert({
        id,
        cartId,
        timingId,
        paymentMethod,
        userId,
        addressId,
        pickupDate,
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

  public async findRequests(userId: string) {
    try {
      const requests = await this.requestRepository.find({ where: { userId } });
      return requests;
    } catch (error) {
      throw error;
    }
  }
}
