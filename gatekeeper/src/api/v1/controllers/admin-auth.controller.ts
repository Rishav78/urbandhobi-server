import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Logger,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { handleMSError } from 'src/lib/helpers';
import { SignupQueryDTO } from '../dto/admin-auth.dto';
import { SignUpWithEmailDTO } from '../dto/auth.dto';

@Controller('admin')
export class AdminAuthController {
  private readonly logger = new Logger('auth-controller-v1', true);
  constructor(
    @Inject('AUTHENTICATION_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @Put(['signup'])
  public async signUpWithEmail(
    @Query(ValidationPipe) { role }: SignupQueryDTO,
    @Body(ValidationPipe) { email, password }: SignUpWithEmailDTO,
  ) {
    try {
      if (role === 'USER') {
        throw new BadRequestException(
          'use /api/:version/auth/signup for user signup',
        );
      }
      const id = await this.authClient
        .send('UD.GateKeeper.SignUpWithEmail', {
          email,
          password,
          role,
        })
        .toPromise<string>();
      return id;
    } catch (error) {
      throw handleMSError(error);
    }
  }
}
