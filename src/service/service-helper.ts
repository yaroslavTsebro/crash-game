import {validateSync} from "class-validator";
import logger from '../utils/logger';
import { ErrorCodes } from '../shared/model/constant/error-codes';
import { ErrorMessages } from '../shared/model/constant/error-messages';
import { AppError } from '../utils/error/app-error';

export class ServiceHelper {
  public static validateInput<T extends object>(dto: T): void {
    const errors = validateSync(dto, {enableDebugMessages: false});
    if (errors.length > 0) {
      throw new AppError(
          ErrorCodes.VALIDATION_ERROR,
          ErrorMessages.VALIDATION_ERROR, errors.map(e => {
            if (e.constraints) {
              return e.constraints;
            }
          }))
    }
    logger.info("Validated successfully");
  }

  public static validateId(id: number): void {
    if (id <= 0) {
      throw new AppError(
          ErrorCodes.BAD_REQUEST,
          ErrorMessages.BAD_REQUEST,
          []);
    }
    logger.info("Validated successfully")
  }

  public static validateIds(ids: number[]): void {
    ids.map(id => this.validateId(id));
  }
}
