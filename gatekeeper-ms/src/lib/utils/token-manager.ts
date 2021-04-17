import * as jwt from 'jsonwebtoken';
import { SignInMethod } from 'src/typings/auth';
import { RefreshTokenPayload, Token, TokenPayload } from 'src/typings/token';

export interface SignAccessArgs {
  method: SignInMethod;
  admin: boolean;
  id: string;
}

export interface SignRefreshArgs extends SignAccessArgs {
  email: string;
}

export class TokenManager {
  private readonly authSecret: string = process.env.AUTH_SECRET;
  private readonly refreshSecret: string = process.env.REFRESH_SECRET;

  private readonly authExp: number = Number(process.env.AUTH_EXP) || 120;
  private readonly refreshExp: number =
    Number(process.env.REFRESH_EXP) || 7776000;

  public async signAccess(obj: SignAccessArgs): Promise<Token> {
    const exp = this.authExp;
    const iat = new Date().getTime();
    const payload: TokenPayload = { ...obj };

    try {
      const token = await new Promise<string>((resolve, reject) => {
        jwt.sign(
          payload,
          this.authSecret,
          {
            algorithm: 'HS256',
            expiresIn: this.authExp,
          },
          (error: Error, encoded: string) => {
            if (error) {
              return reject(error);
            }
            return resolve(encoded);
          },
        );
      });
      return { token, exp, iat };
    } catch (error) {
      throw error;
    }
  }

  public async verifyAccess(token: string) {
    try {
      const payload = await new Promise<TokenPayload>((resolve, reject) => {
        jwt.verify(token, this.authSecret, (error, obj: TokenPayload) => {
          if (error) {
            return reject(error);
          }
          return resolve(obj);
        });
      });
      return payload;
    } catch (error) {
      throw error;
    }
  }

  public async signRefresh(obj: SignRefreshArgs) {
    const exp = this.refreshExp;
    const iat = new Date().getTime();
    const payload: RefreshTokenPayload = { ...obj };

    try {
      const token = await new Promise<string>((resolve, reject) => {
        jwt.sign(
          payload,
          this.refreshSecret,
          {
            algorithm: 'HS256',
            expiresIn: this.refreshExp,
          },
          (error: Error, encoded: string) => {
            if (error) {
              return reject(error);
            }
            return resolve(encoded);
          },
        );
      });
      return { token, exp, iat };
    } catch (error) {
      throw error;
    }
  }

  public async signAccessAndRefresh(
    obj1: SignAccessArgs,
    obj2: SignRefreshArgs,
  ) {
    try {
      const [access, refresh] = await Promise.all([
        this.signAccess(obj1),
        this.signRefresh(obj2),
      ]);
      return { access, refresh };
    } catch (error) {
      throw error;
    }
  }

  public async verifyRefresh() {}
}
