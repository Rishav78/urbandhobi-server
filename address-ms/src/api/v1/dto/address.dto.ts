import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class AddAddressDTO {
  @IsOptional()
  @IsString()
  title: string;

  @IsUUID('4', { message: 'provide a valid user id' })
  userId: string;

  @IsEmail({}, { message: 'provide a valid email' })
  email: string;

  @IsString({ message: 'invalid house number' })
  houseno: string;

  @IsString({ message: 'incorrect city name' })
  city: string;

  @IsString({ message: 'invalid postal/pin code' })
  postalCode: string;

  @IsString({ message: 'invalid state name' })
  state: string;

  @IsOptional()
  @IsString({ message: 'invalid state code' })
  stateCode: string;

  @IsOptional()
  @IsString({ message: 'invalid country name' })
  country: string;

  @IsOptional()
  @IsString({ message: 'invalid country code' })
  countryCode: string;

  @IsString({ message: 'invalid locality' })
  locality: string;

  @IsOptional()
  @IsString()
  district: string;
}

export class FindByIdDTO {
  @IsUUID('4', { message: 'invalid user id' })
  userId: string;
}

export class UpdateDefaultAddressDTO {
  @IsUUID('4', { message: 'invalid user id' })
  userId: string;

  @IsUUID('4', { message: 'invalid address id' })
  id: string;
}

export class GetDefaultOrByIdDTO {
  @IsOptional()
  @IsUUID('4', { message: 'invalid user id' })
  id: string;

  @IsUUID('4', { message: 'invalid user id' })
  userId: string;
}
