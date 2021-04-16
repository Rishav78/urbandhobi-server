import { Body, Controller, Inject, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { handleMSError } from 'src/lib/helpers';
import { ValidationPipe } from 'src/lib/pipe/validation.pipe';
import { SignUpWithEmailDTO } from '../dto/auth.dto';

@Controller('')
export class AuthController {
  constructor(
    @Inject('AUTHENTICATION_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @Put(['signup', 'signup/email'])
  public async signUpWithEmail(
    @Body(new ValidationPipe()) { email, password }: SignUpWithEmailDTO,
  ) {
    try {
      const id = await this.authClient
        .send('UD.GateKeeper.SignUpWithEmail', {
          email,
          password,
        })
        .toPromise<string>();
      return id;
    } catch (error) {
      throw handleMSError(error);
    }
  }
}
