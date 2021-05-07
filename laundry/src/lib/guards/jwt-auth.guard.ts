import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CustomRequest, User } from 'src/typings';

@Injectable()
export class JWTAuthGuard implements CanActivate {
  private readonly logger = new Logger('jwt-auth-guard');
  constructor(
    @Inject('AUTHENTICATION_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<CustomRequest>();
    const auth: string | null | undefined = req.get('Authorization');
    try {
      if (!auth) {
        throw new UnauthorizedException('unauthorized');
      }
      const [Bearer, token] = auth.split(' ');
      if (Bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('invalid token');
      }
      const user = await this.authClient
        .send('UD.GateKeeper.CurrentUser', token)
        .toPromise<null | User>();
      if (!user) {
        throw new UnauthorizedException('unauthorized');
      }
      req.user = user;
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }
}