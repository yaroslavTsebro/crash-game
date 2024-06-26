import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { Bet } from './bet';
import { BaseEntity } from './base-entity';
import { Multiplier } from './multiplier';

@Entity()
export class Game extends BaseEntity {
  @OneToMany(() => Bet, b => b.game)
  bets = new Collection<Bet>(this);

  @OneToMany(() => Multiplier, m => m.game)
  multipliers = new Collection<Multiplier>(this);

  @Property()
  startTime?: Date;

  @Property()
  endTime?: Date;

  @Property({ type: 'bigint' })
  finalMultiplier?: bigint;
}