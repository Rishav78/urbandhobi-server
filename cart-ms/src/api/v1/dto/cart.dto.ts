import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCartDTO {
  @IsUUID('4', { message: 'provide a valid user id' })
  public id: string;

  @IsOptional()
  @IsString({ message: 'provide a valid name' })
  public name?: string;
}
