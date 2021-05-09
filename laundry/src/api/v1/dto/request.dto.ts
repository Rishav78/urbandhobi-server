import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsUUID,
  IsDateString,
} from 'class-validator';

export class RaiseDTO {
  @IsNumber({}, { message: 'invalid timing id' })
  timingId: number;

  @IsEnum(['cod'])
  paymentMethod: 'cod';

  @IsDateString()
  pickupDate: Date;

  @IsOptional()
  @IsUUID('4', { message: 'invalid address id' })
  addressId: string;
}
