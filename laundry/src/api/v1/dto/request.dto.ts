import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsUUID,
  IsDateString,
} from 'class-validator';

export class RaiseDTO {
  @IsEnum(['cod'])
  paymentMethod: 'cod';
}

export class RovokeDTO {
  @IsUUID('4', { message: 'invalid request id' })
  id: string;
}

export class ScheduleDTO {
  @IsNumber({}, { message: 'invalid timing id' })
  timingId: number;

  @IsDateString()
  pickupDate: Date;

  @IsOptional()
  @IsUUID('4', { message: 'invalid address id' })
  addressId: string;
}
