import {
  Inject,
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger('jwt-auth-middleware', true);
  constructor(
    @Inject('AUTHENTICATION_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  async use(req: any, res: any, next: () => void) {
    const auth: string | null | undefined = req.get('Authorization');
    try {
      if (!auth) {
        throw new UnauthorizedException('unauthorized');
      }
      const [Bearer, token] = auth.split(' ');
      if (Bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('invalid token');
      }
      const authenticated = await this.authClient
        .send('UD.GateKeeper.IsAuthenticated', token)
        .toPromise();

      if (!authenticated) {
        throw new UnauthorizedException('unauthorized');
      }

      return next();
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException('token authorization failed');
    }
  }
}
