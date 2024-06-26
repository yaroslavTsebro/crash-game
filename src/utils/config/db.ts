import { User } from '../../entity/user';
import { Game } from '../../entity/game';
import { Bet } from '../../entity/bet';
import { Multiplier } from '../../entity/multiplier';
import { Transaction } from '../../entity/transaction';
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