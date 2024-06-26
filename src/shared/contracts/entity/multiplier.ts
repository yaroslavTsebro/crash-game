import { IBaseEntity } from './base-entity';
import { IGame } from './game';

export interface IMultiplier extends IBaseEntity {
  game: IGame;
  multiplier: bigint;
  multipliedAt: Date;
}