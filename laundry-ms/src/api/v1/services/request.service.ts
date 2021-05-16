import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Request } from '../db/entitys';
import { v4 as uuidv4 } from 'uuid';

interface AddArgs {
  cartId: string;
  paymentMethod: 'cod';
}

interface ScheduleArgs {
  id: string;
  timingId: number;
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

  public async add({ cartId, paymentMethod }: AddArgs, userId: string) {
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
        paymentMethod,
        userId,
      });
      return id;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async schedule(
    { addressId, pickupDate, timingId, id }: ScheduleArgs,
    userId: string,
  ) {
    try {
      const request = await this.findById(id);
      if (!request) {
        throw new NotFoundException('unable to find request');
      }
      if (!request.revoked) {
        throw new BadRequestException('request is already scheduled');
      }
      await this.requestRepository
        .createQueryBuilder('request')
        .update()
        .set({ addressId, pickupDate, timingId, revoked: false })
        .where('id = :id', { id })
        .andWhere('userId = :userId', { userId })
        .execute();
      return id;
    } catch (error) {
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

  public async findById(id: string) {
    try {
      const request = await this.requestRepository.findOne({
        where: { id },
      });
      return request;
    } catch (error) {
      throw error;
    }
  }

  public async findRequests(userId: string) {
    try {
      const requests = await this.requestRepository.find({
        where: { userId },
        order: { createdAt: 'DESC' },
      });
      return requests;
    } catch (error) {
      throw error;
    }
  }

  public async revoke(id: string, userId: string) {
    try {
      await this.requestRepository
        .createQueryBuilder('request')
        .update()
        .set({ revoked: true })
        .where('id = :id', { id })
        .andWhere('userId = :userId', { userId })
        .execute();
      return true;
    } catch (error) {
      throw error;
    }
  }

  public async delete(id: string, userId: string) {
    try {
      await this.requestRepository
        .createQueryBuilder('request')
        .softDelete()
        .where('id = :id', { id })
        .andWhere('userId = :userId', { userId })
        .execute();
      return true;
    } catch (error) {
      throw error;
    }
  }
}
