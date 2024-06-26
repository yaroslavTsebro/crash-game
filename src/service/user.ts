import bcrypt from "bcrypt";
import { instanceToPlain } from "class-transformer";
import { JwtPayload } from "jsonwebtoken";
import { ServiceHelper } from './service-helper';
import { ErrorCodes } from '../shared/model/constant/error-codes';
import { ErrorMessages } from '../shared/model/constant/error-messages';
import { UserCreateDto, UserLoginDto, UserProfileDto } from '../shared/model/dto/user';
import { User } from '../shared/model/entity/user';
import { AppError } from '../utils/error/app-error';
import { TokenDto } from '../shared/model/dto/token';
import userRepository from "../repository/user";
import Jwt from "../utils/jwt";

type TokenResponse = Promise<{
  accessToken: string,
  refreshToken: string,
  user: TokenDto
}>;

class UserService extends ServiceHelper {

  public async registration(dto: UserCreateDto): TokenResponse {
    try {
      UserService.validateInput(dto);

      const currentUser = await userRepository.getUserByUsername(dto.username);

      if (currentUser) {
        throw new AppError(
          ErrorCodes.ALREADY_HAVE_AN_ACC,
          ErrorMessages.ALREADY_HAVE_AN_ACC,
          []);
      }

      const salt = await bcrypt.genSalt();
      dto.password = await bcrypt.hash(dto.password, salt);

      let user = <User>instanceToPlain(dto);

      const createdUser = await userRepository.createUser(user);
      let tokenDto = new TokenDto(createdUser.id, createdUser.username,
        createdUser.status, createdUser.state);

      const tokens = Jwt.generateTokens(tokenDto);
      return { ...tokens, user: tokenDto };
    } catch (e) {
      throw e;
    }
  }

  public async login(dto: UserLoginDto): TokenResponse {
    try {
      UserService.validateInput(dto);

      const currentUser = await userRepository.getUserByUsername(dto.username);

      if (!currentUser) {
        throw new AppError(
          ErrorCodes.DONT_HAVE_SUCH_ACC,
          ErrorMessages.DONT_HAVE_SUCH_ACC,
          []);
      }

      const result = bcrypt.compareSync(dto.password, currentUser.password);
      if (!result) {
        throw new AppError(
          ErrorCodes.WRONG_PASS,
          ErrorMessages.WRONG_PASS,
          []);
      }

      const tokenDto = new TokenDto(currentUser.id, currentUser.username,
        currentUser.status, currentUser.state);

      const tokens = Jwt.generateTokens(tokenDto);
      return { ...tokens, user: tokenDto };
    } catch (e) {
      throw e;
    }
  }

  public async refresh(token: string): TokenResponse {
    try {
      if (!token) {
        throw new AppError(
          ErrorCodes.UNAUTHORIZED,
          ErrorMessages.UNAUTHORIZED,
          [])
      }

      const userData = Jwt.validateRefreshToken(token)
      
      if (!userData) {
        throw new AppError(
          ErrorCodes.UNAUTHORIZED,
          ErrorMessages.UNAUTHORIZED,
          [])
      }

      const user = await userRepository.getUserById(
        (userData as JwtPayload).id);

      if (!user) {
        throw new AppError(
          ErrorCodes.DONT_HAVE_SUCH_ACC,
          ErrorMessages.DONT_HAVE_SUCH_ACC,
          []);
      }

      const dto = new TokenDto(user.id, user.username, user.status, user.state);
      const tokens = Jwt.generateTokens(dto);

      return { ...tokens, user: dto }
    } catch (e) {
      throw e;
    }
  }

  public async getProfile(userId: string): Promise<UserProfileDto> {
    try {
      let profile = await userRepository.getProfile(userId);
      if (profile) {
        return profile
      } else {
        throw new AppError(
          ErrorCodes.DONT_HAVE_SUCH_ACC,
          ErrorMessages.DONT_HAVE_SUCH_ACC,
          []);
      }
    } catch (e) {
      throw e;
    }
  }
}

export default new UserService();