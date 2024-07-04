import { random } from 'mathjs';
import appConfig from '../../config/app';
import { BigIntHelper } from '../bigint-helper';
import { generateHashBasedOnPreviousHash } from "../get-hash";

export type GeneratedCrashGame = { crash: number, hash: string };
export type DistributionType = 'uniform' | 'normal' | 'exponential' | 'lognormal' | 'gamma';

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

    if (this.isDivisible(h, 21)) return { crash: 1.00, hash };

    const numerator = BigInt(100) * (e * BigInt(100) - hBigInt);
    const denominator = e - hBigInt;
    const crashBigInt = numerator / denominator;
    let crash = Number(crashBigInt) / 10000;

    // ofc just for test
    if (crash > 200) { crash = 200 + Math.log(crash - 200); }
    if (crash > 50 && Math.random() > 0.5) { crash /= 2; }

    const crashFormatted = Number(crash.toFixed(2));
    return { crash: crashFormatted, hash };
  }

  public generateCrashValueMath(previousHash: string, distributionType: DistributionType): GeneratedCrashGame {
    const hash = generateHashBasedOnPreviousHash(previousHash, this.salt);
    const h = hash.substring(0, 13);

    if (this.isDivisible(h, 21)) return { crash: 1.00, hash };

    let crash: number;
    switch (distributionType) {
      case 'normal':
        crash = this.generateNormalCrash();
        break;
      case 'exponential':
        crash = this.generateExponentialCrash();
        break;
      case 'lognormal':
        crash = this.generateLogNormalCrash();
        break;
      case 'gamma':
        crash = this.generateGammaCrash();
        break;
      default:
        crash = this.generateUniformCrash();
    }

    // ofc just for test
    if (crash < 1) crash = 1;
    if (crash > 200) crash = 200 + Math.log(crash - 200);

    const crashFormatted = Number(crash.toFixed(2));

    return { crash: crashFormatted, hash };
  }

  private generateUniformCrash(): number {
    return random(1, 100);
  }

  private generateNormalCrash(): number {
    const mean = 2;
    const stdDev = 1;
    let u1 = 0, u2 = 0;
    while (u1 === 0) u1 = Math.random();
    while (u2 === 0) u2 = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return mean + stdDev * z;
  }

  private generateExponentialCrash(): number {
    const lambda = 1 / 20;
    const expValue = -Math.log(1 - Math.random()) / lambda;
    return Math.min(expValue, 100);
  }

  private generateLogNormalCrash(): number {
    const mu = 2.5;
    const sigma = 0.75;
    const normal = this.generateNormalCrash();
    return Math.exp(mu + sigma * normal);
  }

  private generateGammaCrash(): number {
    const alpha = 2;
    const beta = 2;
    let x = 0;
    for (let i = 0; i < alpha; i++) {
      x += -Math.log(Math.random());
    }
    return x / beta;
  }
}