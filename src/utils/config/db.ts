import { User } from '../../shared/dto/entity/user';
import { Game } from '../../shared/dto/entity/game';
import { Bet } from '../../shared/dto/entity/bet';
import { Multiplier } from '../../shared/dto/entity/multiplier';
import { Transaction } from '../../shared/dto/entity/transaction';
import { Options } from '@mikro-orm/postgresql';
import appConfig from './app';

const config: Options = {
  entities: [User, Game, Bet, Multiplier, Transaction],
  dbName: appConfig.DB_NAME,
  user: appConfig.DB_USER,
  password: appConfig.DB_PASSWORD,
  host: appConfig.DB_HOST,
  port: appConfig.DB_PORT,
  debug: appConfig.DB_DEBUG,
};

export default config;