import {NextFunction, Request, Response} from "express";
import {plainToInstance} from "class-transformer";
import logger from '../utils/logger';
import { UserCreateDto, UserLoginDto } from '../shared/model/dto/user';
import appConfig from '../utils/config/app';
import userService from "../service/user"


class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info('Registration started')
      const userCreateDto = plainToInstance(UserCreateDto, req.body);
      logger.info('userCreateDto:', userCreateDto);

      const userData = await userService.registration(userCreateDto)
      UserController.addRefreshTokenToCookie(res, userData.refreshToken);

      logger.info('Registration ended')
      return res.json(userData).end();
    } catch (e) {
      next(e)
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info('Loggining started')
      const userLoginDto = plainToInstance(UserLoginDto, req.body);
      logger.info('userLoginDto:', userLoginDto);

      const userData = await userService.login(userLoginDto)
      UserController.addRefreshTokenToCookie(res, userData.refreshToken);

      logger.info('Loggining ended')
      return res.json(userData).end();
    } catch (e) {
      next(e)
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info('Logout started')
      res.clearCookie('refreshToken');
      logger.info('Logout ended')
      return res.end();
    } catch (e) {
      next(e);
    }
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info('getProfile started')

      const userId = req.user.id;
      logger.info('userId: ', userId);
      const profile = await userService.getProfile(userId);

      logger.info('getProfile ended')
      return res.json(profile);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info('refresh started')
      const {refreshToken} = req.cookies;
      const userData = await userService.refresh(refreshToken);
      UserController.addRefreshTokenToCookie(res, userData.refreshToken);

      logger.info('refresh ended')
      return res.json(userData);
    } catch (e) {
      next(e)
    }

  }

  public static addRefreshTokenToCookie(res: Response, token: string) {
    res.cookie('refreshToken', token,
        {maxAge: appConfig.JWT_REFRESH_AGE, httpOnly: true})
    logger.info('Refresh token was added to the cookie');
  }
}

export default new UserController();