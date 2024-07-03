import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { Bet } from './bet';
import { BaseEntity } from './base-entity';
import { IGame } from '../../contracts/entity/game';

@Entity()
export class Game extends BaseEntity implements IGame {
  @OneToMany(() => Bet, b => b.game)
  bets = new Collection<Bet>(this);
   
  @Property()
  hash!: string;

  @Property()
  startTime?: Date;

  @Property()
  endTime?: Date;

  @Property({ type: 'bigint' })
  finalMultiplier?: bigint;
}