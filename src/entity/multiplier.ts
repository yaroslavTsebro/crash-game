import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Game } from './game';
import { BaseEntity } from './base-entity';

@Entity()
export class Multiplier extends BaseEntity{
  @ManyToOne(() => Game)
  game!: Game;

  @Property({type: 'bigint'})
  multiplier!: bigint

  @Property()
  multipliedAt!: Date;
}