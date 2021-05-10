import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsUUID,
  IsDateString,
} from 'class-validator';

export class RaiseDTO {
  @IsUUID('4', { message: 'invalid user id' })
  userId: string;

  @IsUUID('4', { message: 'invalid cart id' })
  cartId: string;

  @IsOptional()
  @IsUUID('4', { message: 'invalid address id' })
  addressId: string;

  @IsDateString()
  pickupDate: Date;

  @IsNumber()
  timingId: number;

  @IsEnum(['cod'])
  paymentMethod: 'cod';
}

export class RequestsDTO {
  @IsUUID('4', { message: 'invalid user id' })
  userId: string;
}

export class RevokeDTO {
  @IsUUID('4', { message: 'invalid request id' })
  id: string;

  @IsUUID('4', { message: 'invalid user id' })
  userId: string;
}
