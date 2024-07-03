import { Bet } from '../../shared/model/entity/bet';
import * as crypto from "crypto";

export function generateGameHashBasedOnBetsAndGameAndOtherRandomThings(gamesBets: Bet[], gameId: string): string {
  const betStrings = gamesBets.map(bet => `${bet.id} ${bet.createdAt} ${generateRandomCharInRange()}`);
  let stringToHash = betStrings.reduce((acc, curr) => acc + curr, "")

  const now = new Date();
  stringToHash += now.toISOString();
  stringToHash += gameId;

  return crypto.createHash('sha256').update(stringToHash).digest('hex');
}

export function generateHashBasedOnPreviousHash(prevHash: string, salt: string): string {
  return crypto.createHash('sha256').update(`${prevHash}${salt}`).digest('hex');
}