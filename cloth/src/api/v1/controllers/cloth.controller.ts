import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cloth } from '../typings/cloth';

@Controller()
export class ClothController {
  constructor(
    @Inject('CLOTH_SERVICE') private readonly clothClient: ClientProxy,
  ) {}

  @Get()
  public async get() {
    try {
      const clothes = await this.clothClient
        .send<any, any>('UD.Cloth.FindAll', {})
        .toPromise<Cloth[]>();
      return clothes;
    } catch (error) {
      throw error;
    }
  }
}
