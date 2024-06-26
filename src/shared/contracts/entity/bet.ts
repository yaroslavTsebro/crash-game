import { IBaseEntity } from './base-entity';
import { IGame } from './game';
import { IUser } from './user';

export interface IBet extends IBaseEntity {
  game: IGame;
  amount: bigint;
  cashOutMultiplier: bigint;
  payout: bigint;
  user: IUser;
}