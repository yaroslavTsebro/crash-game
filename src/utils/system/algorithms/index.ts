import appConfig from '../../config/app';
import { BigIntHelper } from '../bigint-helper';
import { generateHashBasedOnPreviousHash } from "../get-hash";

export type GeneratedCrashGame = { crash: number, hash: string };

export class CrashGame {

  private salt = appConfig.GAMBLING_SALT;

  private hexToBigInt(hex: string) {
    return BigInt(`0x${hex}`)
  }

  private reversePartition(xs: string, n: number): string[][] {
    if (xs.length <= n) return [[xs]];

    const firstLength = xs.length % n || n;
    const result: string[][] = [];

    result.push([xs.slice(0, firstLength)]);

    for (let i = firstLength; i < xs.length; i += n) {
      result.push([xs.slice(i, i + n)]);
    }

    return result;
  }


  private isDivisible(hex: string, n: number): boolean {
    const chunkToBigInt = (chunk: string) => this.hexToBigInt(chunk);

    const chunks = this.reversePartition(hex, 4).map(([chunk]) => chunkToBigInt(chunk));

    const result = chunks.reduce((val: bigint, current: bigint) => {
      const shiftedVal = BigIntHelper.leftShift(val, 16);
      const addedVal = BigInt(shiftedVal + current);
      return BigInt(addedVal % BigInt(n));
    }, BigInt(0));

    return result === BigInt(0);
  }


  public generateCrashValue(previousHash: string): GeneratedCrashGame {
    const hash = generateHashBasedOnPreviousHash(previousHash, this.salt);
    const e = BigInt(2 ** 52);
    const h = hash.substring(0, 13);
    const hBigInt = this.hexToBigInt(h);

    if (this.isDivisible(h, 21)) return { crash: 1.00, hash }

    const numerator = BigInt(100) * (BigInt(100) * e - hBigInt);
    const denominator = e - hBigInt;
    const crashBigInt = numerator / denominator;
    const crash = Number((Number(crashBigInt) / 10000).toFixed(2));

    return { crash, hash } as GeneratedCrashGame;
  }
}


