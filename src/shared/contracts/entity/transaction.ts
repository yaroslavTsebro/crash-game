import { IBaseEntity } from './base-entity';
import { IUser } from './user';

export enum TransactionStatus {
  ERROR,
  SUCCESS,
  IN_PROGRESS,
  CANCELED,
}

export enum TransactionType {
  INCOMING,
  OUTGOING,
}

export interface ITransaction extends IBaseEntity {
  username: string;
  address: string;
  status: TransactionStatus;
  type: TransactionType;
  amount: bigint;
  user: IUser;
}