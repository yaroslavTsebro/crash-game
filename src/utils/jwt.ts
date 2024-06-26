import jwt, {JwtPayload} from 'jsonwebtoken'
import appConfig from './config/app';
import { TokenDto } from '../shared/model/dto/token';

class Jwt {
  public generateTokens(token: TokenDto): {
    accessToken: string,
    refreshToken: string
  } {
    const accessToken: string = jwt.sign(
        {...token},
        appConfig.JWT_ACCESS_SECRET,
        {expiresIn: '20m'});
    const refreshToken: string = jwt.sign(
        {...token},
        appConfig.JWT_REFRESH_SECRET,
        {expiresIn: '30d'});
    return {
      accessToken,
      refreshToken
    }
  }

  public validateAccessToken(token: string): JwtPayload | string | null {
    return this.validateToken(token, appConfig.JWT_ACCESS_SECRET);
  }

  public validateRefreshToken(token: string): JwtPayload | string | null {
    return this.validateToken(token, appConfig.JWT_REFRESH_SECRET);
  }

  private validateToken(
      token: string, secret: string): JwtPayload | string | null {
    try {
      return jwt.verify(token, secret);
    } catch (e) {
      return null;
    }
  }
}

export default new Jwt();