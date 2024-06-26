import { Property, Enum, ManyToOne, Entity } from '@mikro-orm/core';
import { BaseEntity } from './base-entity';
import { User } from './user';

export enum TransactionStatus {
  ERROR,
  SUCCESS,
  IN_PROGRESS,
  CANCELED
}

export enum TransactionType {
  INCOMING,
  OUTGOING,
}

@Entity()
export class Transaction extends BaseEntity {
  @Property({ type: 'character varying', unique: true, length: 25 })
  username!: string;

  @Property()
  address!: string;

  @Enum(() => TransactionStatus)
  status!: TransactionStatus;

  @Enum(() => TransactionType)
  type!: TransactionType;

  @Property({ type: 'bigint' })
  amount!: bigint;

  @ManyToOne(() => User)
  user!: User;
}