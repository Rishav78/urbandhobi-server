import { IsEnum, IsNumber, IsUUID } from 'class-validator';

export class RaiseDTO {
  @IsUUID('4', { message: 'invalid user id' })
  userId: string;

  @IsUUID('4', { message: 'invalid address id' })
  cartId: string;

  @IsNumber()
  timingId: number;

  @IsEnum(['cod'])
  paymentMethod: 'cod';
}
