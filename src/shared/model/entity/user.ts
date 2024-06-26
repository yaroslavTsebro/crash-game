import { Collection, Entity, Enum, OneToMany, Property } from '@mikro-orm/core';
import { Bet } from './bet';
import { BaseEntity } from './base-entity';
import { Transaction } from './transaction';
import { UserStatus, UserState } from '../../contracts/entity/user';

@Entity()
export class User extends BaseEntity {
  @Property({ type: 'character varying', unique: true, length: 25 })
  username!: string;

  @Property({ type: 'character varying', length: 50 })
  password!: string;

  @Enum(() => UserStatus)
  status!: UserStatus;

  @Enum(() => UserState)
  state!: UserState;

  @Property({ type: 'bigint' })
  expense!: bigint;

  @OneToMany(() => Bet, b => b.user)
  bets = new Collection<Bet>(this);

  @OneToMany(() => Transaction, t => t.user)
  transactions = new Collection<Transaction>(this);
}