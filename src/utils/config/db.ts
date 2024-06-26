import { User } from '../../shared/model/entity/user';
import { Game } from '../../shared/model/entity/game';
import { Bet } from '../../shared/model/entity/bet';
import { Multiplier } from '../../shared/model/entity/multiplier';
import { Transaction } from '../../shared/model/entity/transaction';
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