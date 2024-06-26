import { BaseEntity, Collection, Entity, ManyToOne, Property } from '@mikro-orm/core';
import { User } from './user';
import { Game } from './game';

@Entity()
export class Bet extends BaseEntity{
  @ManyToOne(() => Game)
  game!: Game;

  @Property({ type: 'bigint' })
  amount!: bigint;

  @Property({type: 'bigint'})
  cashOutMultiplier!: bigint;

  @Property({type: 'bigint'})
  payout!: bigint;

  @ManyToOne(() => User)
  user!: User;
}