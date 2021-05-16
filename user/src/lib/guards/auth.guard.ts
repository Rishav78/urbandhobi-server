import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  Logger,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Authentication, CustomRequest, User } from 'src/typings';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger('jwt-auth-guard');
  constructor(
    @Inject('AUTHENTICATION_SERVICE') private readonly authClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<CustomRequest>();
    const Authorization: string | null | undefined = req.get('Authorization');
    try {
      if (!Authorization) {
        throw new UnauthorizedException('unauthorized');
      }
      const [Bearer, token] = Authorization.split(' ');
      if (Bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('invalid token');
      }
      const auth = await this.authClient
        .send('UD.GateKeeper.CurrentUser', token)
        .toPromise<null | Authentication>();
      if (!auth) {
        throw new UnauthorizedException('unauthorized');
      }
      const user = await this.userClient
        .send('UD.User.CurrentUser', { email: auth.email })
        .toPromise<User>();

      if (!user) {
        throw new InternalServerErrorException(
          'some error occur please try again later',
        );
      }

      req.user = user;
      req.auth = auth;
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }
}
