import { Collection } from '@mikro-orm/core';
import { IBet } from './bet';
import { ITransaction } from './transaction';
import { IBaseEntity } from './base-entity';

export enum UserStatus{
  VIP,
  REGULAR
}

export enum UserState{
  BLOCKED,
  ACTIVE
}

export interface IUser extends IBaseEntity {
  username: string;
  password: string;
  status: UserStatus;
  state: UserState;
  expense: bigint;
  bets: Collection<IBet>;
  transactions: Collection<ITransaction>;
}
