import { Property, SerializedPrimaryKey } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { IBaseEntity } from '../../contracts/entity/base-entity';

export abstract class BaseEntity implements IBaseEntity {
  @SerializedPrimaryKey()
  id: string = v4();

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}