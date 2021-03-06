import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Put,
  Headers,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { handleMSError } from 'src/lib/helpers';
import { ValidationPipe } from 'src/lib/pipe/validation.pipe';
import { SignInWithEmailDTO, SignUpWithEmailDTO } from '../dto/auth.dto';

@Controller('')
export class AuthController {
  private readonly logger = new Logger('auth-controller-v1', true);
  constructor(
    @Inject('AUTHENTICATION_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @Post(['signin', 'signin/email'])
  public async signInWithEmail(
    @Body(new ValidationPipe()) { email, password }: SignInWithEmailDTO,
  ) {
    this.logger.log('user hit at v1/signin');
    try {
      const token = await this.authClient
        .send('UD.GateKeeper.SignInWithEmail', {
          email,
          password,
        })
        .toPromise<string>();
      return token;
    } catch (error) {
      throw handleMSError(error);
    }
  }

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

  @Get('authenticated')
  public async authenticated(@Headers('Authorization') auth: string) {
    try {
      if (!auth) {
        throw new UnauthorizedException('unauthorized');
      }
      const [bearer, token] = auth.split(' ');
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('unauthorized');
      }
      const authenticated: boolean = await this.authClient
        .send('UD.GateKeeper.IsAuthenticated', token)
        .toPromise();

      return authenticated;
    } catch (error) {
      throw error;
    }
  }

  @Get('currentuser')
  public async currentUser(@Headers('Authorization') auth: string) {
    try {
      if (!auth) {
        throw new UnauthorizedException('unauthorized');
      }
      const [bearer, token] = auth.split(' ');
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('unauthorized');
      }
      const user = await this.authClient
        .send('UD.GateKeeper.CurrentUser', token)
        .toPromise();

      return user;
    } catch (error) {
      throw error;
    }
  }
}
