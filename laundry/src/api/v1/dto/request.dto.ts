import { IsEnum, IsNumber } from 'class-validator';

export class RaiseDTO {
  @IsNumber()
  timingId: number;

  @IsEnum(['cod'])
  paymentMethod: 'cod';
}
