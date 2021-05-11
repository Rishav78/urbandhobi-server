import {
  Body,
  Controller,
  Inject,
  Logger,
  Param,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { handleMSError } from 'src/lib/helpers';
import { SignupParamsDTO } from '../dto/admin-auth.dto';
import { SignUpWithEmailDTO } from '../dto/auth.dto';

@Controller('admin')
export class AdminAuthController {
  private readonly logger = new Logger('auth-controller-v1', true);
  constructor(
    @Inject('AUTHENTICATION_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @Put(['signup'])
  public async signUpWithEmail(
    @Param(ValidationPipe) { role }: SignupParamsDTO,
    @Body(ValidationPipe) { email, password }: SignUpWithEmailDTO,
  ) {
    try {
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
