import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Address as AddressT } from '../typings';
import { Address } from '../db/entities';

@Injectable()
export class AddressService {
  private readonly logger: Logger = new Logger('ADDRESS SERVICE', true);
  constructor(
    private connection: Connection,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  public async add(obj: AddressT.AddService) {
    const id = uuidv4();
    try {
      await this.addressRepository.insert({ ...obj, id });
      return id;
    } catch (error) {
      throw error;
    }
  }

  public async findById(id: string) {
    try {
      const address = await this.addressRepository.findOne({ where: { id } });
      return address;
    } catch (error) {
      throw error;
    }
  }

  public async findByUserId(userId: string) {
    try {
      const address = await this.addressRepository.find({ where: { userId } });
      return address;
    } catch (error) {
      throw error;
    }
  }

  public async markDefault(id: string, userId: string) {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      if (!(await this.addressRepository.findOne({ where: { id } }))) {
        throw new NotFoundException('invalid address id');
      }
      await queryRunner.manager
        .createQueryBuilder(Address, 'address')
        .update({ default: false })
        .where('userId = :userId', { userId })
        .execute();
      await queryRunner.manager
        .createQueryBuilder(Address, 'address')
        .update({ default: true })
        .where('address.id = :id', { id })
        .execute();
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async getDefault(userId: string) {
    this.logger.log('getDefault start');
    try {
      const address = await this.addressRepository.findOne({
        where: { userId, default: true },
      });
      return address;
    } catch (error) {
      throw error;
    } finally {
      this.logger.log('getDefault end');
    }
  }

  public async delete(id: string, userId: string) {
    this.logger.log('delete start');
    try {
      const address = await this.addressRepository.findOne({
        where: { id, userId },
      });
      if (!address) {
        throw new NotFoundException('invalid address id');
      }
      if (address.default) {
        throw new BadRequestException('can not delete default address');
      }
      await this.addressRepository.softDelete({ userId, id });
      return address;
    } catch (error) {
      throw error;
    } finally {
      this.logger.log('delete end');
    }
  }
}
