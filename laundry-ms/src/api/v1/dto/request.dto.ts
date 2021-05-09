import { IsEnum, IsNumber, IsUUID } from 'class-validator';

export class RaiseDTO {
  @IsUUID('4', { message: 'invalid user id' })
  userId: string;

  @IsUUID('4', { message: 'invalid cart id' })
  cartId: string;

  @IsUUID('4', { message: 'invalid address id' })
  addressId: string;

  @IsNumber()
  timingId: number;

  @IsEnum(['cod'])
  paymentMethod: 'cod';
}

export class RequestsDTO {
  @IsUUID('4', { message: 'invalid user id' })
  userId: string;
}
