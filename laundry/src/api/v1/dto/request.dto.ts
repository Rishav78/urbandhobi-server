import { IsEnum, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class RaiseDTO {
  @IsNumber({}, { message: 'invalid timing id' })
  timingId: number;

  @IsEnum(['cod'])
  paymentMethod: 'cod';

  @IsOptional()
  @IsUUID('4', { message: 'invalid address id' })
  addressId: string;
}
