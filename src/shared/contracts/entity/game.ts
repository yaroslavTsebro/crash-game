import { IMultiplier } from './multiplier';
import { IBet } from './bet';
import { IBaseEntity } from './base-entity';
import { Collection } from '@mikro-orm/core';

export interface IGame extends IBaseEntity {
  bets: Collection<IBet>;
  multipliers: Collection<IMultiplier>;
  startTime?: Date;
  endTime?: Date;
  finalMultiplier?: bigint;
}