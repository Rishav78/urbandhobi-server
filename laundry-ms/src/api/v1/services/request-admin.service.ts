import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Request } from '../db/entitys';

@Injectable()
export class RequestAdminService {
  private readonly logger: Logger = new Logger('REQUEST SERVICE', true);
  constructor(
    private connection: Connection,
    @InjectRepository(Request)
    private readonly requestRepository: Repository<Request>,
    @Inject('CART_SERVICE') private readonly cartClient: ClientProxy,
  ) {}

  public async findAll(): Promise<Request[]> {
    try {
      const requests = await this.requestRepository
        .createQueryBuilder()
        .select()
        .from(Request, 'request')
        .orderBy('createdAt', 'DESC')
        .getMany();
      return requests;
    } catch (error) {
      throw error;
    }
  }
}
