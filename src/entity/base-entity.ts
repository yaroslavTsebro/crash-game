import { Property, SerializedPrimaryKey } from '@mikro-orm/postgresql';
import { v4 } from 'uuid';

export abstract class BaseEntity {
  @SerializedPrimaryKey()
  id: string = v4();

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}