import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { User } from './user';
import { Game } from './game';
import { BaseEntity } from './base-entity';
import { IBet } from '../../contracts/entity/bet';

@Entity()
export class Bet extends BaseEntity implements IBet {
  @ManyToOne(() => Game)
  game!: Game;

  @Property({ type: 'bigint' })
  amount!: bigint;

  @Property({ type: 'bigint' })
  cashOutMultiplier!: bigint;

  @Property({ type: 'bigint' })
  payout!: bigint;

  @ManyToOne(() => User)
  user!: User;
}