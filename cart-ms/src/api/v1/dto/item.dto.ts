import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

export class AddItemDTO {
  @IsUUID('4', { message: 'provide a valid item id' })
  itemId: string;

  @IsUUID('4', { message: 'provide a valid cart id' })
  cartId: string;

  @IsUUID('4', { message: 'provide a valid service id' })
  serviceId: string;

  @IsUUID('4', { message: 'provide a valid service type id' })
  serviceTypeId: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  count?: number;
}

export class AddItemEvent {
  @IsUUID()
  userId: string;

  @ValidateNested({ each: true })
  @Type(() => AddItemDTO)
  data: AddItemDTO;
}

export class AddItemsEvent {
  @IsUUID()
  userId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddItemDTO)
  data: AddItemDTO[];
}
