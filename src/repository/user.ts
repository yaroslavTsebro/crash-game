import { orm, em } from '../db';
import { ErrorCodes } from '../shared/model/constant/error-codes';
import { ErrorMessages } from '../shared/model/constant/error-messages';
import { UserProfileDto } from '../shared/model/dto/user';
import { User } from '../shared/model/entity/user';
import { AppError } from '../utils/error/app-error';
import logger from '../utils/logger';

class UserRepository {
  private users = orm?.em.getRepository(User)!;

  public async getUserByUsername(username: string): Promise<User | null> {
    try {
      return this.users.findOne({username})
    } catch (e) {
      logger.info("An Error occurred during getUserByEmail")
      throw e;
    }

  }

  public async getUserById(id: string): Promise<User | null> {
    try {
      return this.users.findOne({id})
    } catch (e) {
      logger.info("An Error occurred during getUserById")
      throw e;
    }
  }

  public async createUser(dto: User): Promise<User> {
    try {
      const response = em!.create(User, dto)
      await em!.flush()
      return response;
    } catch (e) {
      logger.info("An Error occurred during createUser")
      throw e;
    }
  }

  public async checkForPresence(id: string): Promise<boolean> {
    try {
      return !!this.users.findOne({id})
    } catch (e) {
      logger.info("An Error occurred during checkForPresence")
      throw e;
    }
  }

  public async getProfile(userId: string): Promise<UserProfileDto | null> {
    try {
      const result = await this.users.findOne({id: userId},{fields: ['username', 'expense', 'createdAt']})

      if(!result) throw new AppError(ErrorCodes.DATA_NOT_FOUND, ErrorMessages.DATA_NOT_FOUND, []);

      return new UserProfileDto(result.username, result.expense, result.createdAt);
    } catch (e) {
      logger.info("An Error occurred during getProfile")
      throw e;
    }
  }

}

export default new UserRepository();