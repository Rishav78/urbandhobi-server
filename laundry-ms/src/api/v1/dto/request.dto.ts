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

export class ScheduleDTO {
  @IsUUID('4', { message: 'invalid request id' })
  id: string;

  @IsUUID('4', { message: 'invalid user id' })
  userId: string;

  @IsDateString()
  pickupDate: Date;

  @IsNumber()
  timingId: number;

  @IsOptional()
  @IsUUID('4', { message: 'invalid address id' })
  addressId: string;
}
