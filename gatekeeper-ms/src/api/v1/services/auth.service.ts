import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Email, EmailModelSchema, name } from '../db/models';

@Injectable()
export class AuthService {
  constructor(@InjectModel(name) private EmailModel: Model<EmailModelSchema>) {}

  public async signUpWithEmail(
    email: string,
    password: string,
  ): Promise<string> {
    try {
      const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
      const obj: Email = { email, password: hash };
      const { _id } = await new this.EmailModel(obj).save();
      return _id;
    } catch (error) {
      throw error;
    }
  }

  public async findByEmail(email: string) {
    try {
      const user = await this.EmailModel.findOne({ email });
      return user;
    } catch (error) {
      throw error;
    }
  }
}
