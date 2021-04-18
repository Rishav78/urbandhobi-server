import { HttpException, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { TokenManager } from 'src/lib/utils/token-manager';
import { Email, EmailModelSchema, name } from '../db/models';

@Injectable()
export class AuthEmailService {
  constructor(
    @InjectModel(name) private EmailModel: Model<EmailModelSchema>,
    private readonly jwtService: TokenManager,
  ) {}

  public async create(email: string, password: string) {
    try {
      const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
      const obj: Email = { email, password: hash };
      const user = await new this.EmailModel(obj).save();
      const tokens = await this.jwtService.signAccessAndRefresh(
        {
          admin: false,
          id: user._id,
          method: 'email',
        },
        {
          admin: false,
          id: user._id,
          method: 'email',
          email: user.email,
        },
      );
      return tokens;
    } catch (error) {
      throw error;
    }
  }

  public async signIn(email: string, password: string) {
    try {
      const user = await this.EmailModel.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new RpcException(
          new HttpException('email or password is incorrect', 404),
        );
      }

      const tokens = await this.jwtService.signAccessAndRefresh(
        {
          admin: false,
          id: user._id,
          method: 'email',
        },
        {
          admin: false,
          id: user._id,
          method: 'email',
          email: user.email,
        },
      );

      return tokens;
    } catch (error) {
      throw error;
    }
  }

  public async findByEmail(email: string) {
    try {
      const user = await this.EmailModel.findOne({ email }, { password: 0 });
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * TODO
   * -- Create different serivce for email, phone and username
   */
  public async findById(id: string) {
    try {
      const user = await this.EmailModel.findById(id, { password: 0 });
      return user;
    } catch (error) {
      throw error;
    }
  }
}
