import { MikroORM } from '@mikro-orm/core';
import config from '../utils/config/db';
import logger from '../utils/logger';

let orm;
let em;

export async function initOrm() {
  try {
    logger.info('Trying to connect to database');
    orm = await MikroORM.init(config);
    em = orm.em;
    logger.info('Connected to database');
    return { orm, em };
  } catch (error) {
    logger.error('Error connecting to database:', error);
    process.exit(1);
  }
}

export { orm, em };