import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../db/entitys';
import { userService } from '../typings';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  public async create({ email }: userService.Create) {
    try {
      const id = uuidv4();
      await this.usersRepository.insert({ id, email });
      return id;
    } catch (error) {
      throw error;
    }
  }

  public async findById(id: string) {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      return user;
    } catch (error) {
      throw error;
    }
  }
}
