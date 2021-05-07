import { Module } from "@nestjs/common";
import {AddressModule} from './address.module';

@Module({
  imports: [AddressModule]
})
export class V1Module {}