import { IsOptional, IsString } from 'class-validator';

export class CreateCartDTO {
  @IsOptional()
  @IsString({ message: 'provide a valid name' })
  public name?: string;
}
