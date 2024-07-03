export class BigIntHelper {
  private static binaryToBigInt(binary: string): bigint {
    return BigInt(`0b${binary}`);
  }

  private static bigIntToBinary(bigInt: BigInt): string {
    return bigInt.toString(2);
  }

  private static getLengthAndPaddedBigInts(a: BigInt, b: BigInt) {
    const binaryA = this.bigIntToBinary(a);
    const binaryB = this.bigIntToBinary(b);

    const length = Math.max(binaryA.length, binaryB.length);
    const paddedA = binaryA.padStart(length, '0');
    const paddedB = binaryB.padStart(length, '0');

    return { length, paddedA, paddedB };
  }

  public static and(a: BigInt, b: BigInt): BigInt {
    const { length, paddedA, paddedB } = this.getLengthAndPaddedBigInts(a, b)

    let binaryResult = ''
    for (let i = 0; i < length; i++) { binaryResult += (paddedA[i] == '1' && paddedB[i] == '1') ? '1' : '0' }

    return this.binaryToBigInt(binaryResult);
  }

  public static or(a: BigInt, b: BigInt): BigInt {
    const { length, paddedA, paddedB } = this.getLengthAndPaddedBigInts(a, b)

    let binaryResult = ''
    for (let i = 0; i < length; i++) { binaryResult += (paddedA[i] == '1' || paddedB[i] == '1') ? '1' : '0' }

    return this.binaryToBigInt(binaryResult);
  }

  public static xor(a: BigInt, b: BigInt): BigInt {
    const { length, paddedA, paddedB } = this.getLengthAndPaddedBigInts(a, b)

    let binaryResult = ''
    for (let i = 0; i < length; i++) {
      const aI = paddedA[i];
      const bI = paddedB[i];
      binaryResult += ((aI == '1' && bI == '0') || (bI == '1' && aI == '0')) ? '1' : '0'
    }

    return this.binaryToBigInt(binaryResult);
  }

  public static not(a: BigInt): BigInt {
    const binaryA = this.bigIntToBinary(a);

    let binaryResult = ''
    for (let i = 0; i < binaryA.length; i++) { binaryResult += binaryA[i] == '1' ? '0' : '1' }

    return this.binaryToBigInt(binaryResult);
  }

  public static shiftRight(a: BigInt, n: number) {
    const binaryA = this.bigIntToBinary(a);
    const firstBit = binaryA[0];

    const binaryResult = binaryA.slice(0, binaryA.length - n).padStart(binaryA.length, firstBit);

    return this.binaryToBigInt(binaryResult);
  }

  public static shiftRightUnsigned(a: BigInt, n: number) {
    const binaryA = this.bigIntToBinary(a);

    const binaryResult = binaryA.slice(0, binaryA.length - n).padStart(binaryA.length, '0');

    return this.binaryToBigInt(binaryResult);
  }

  public static leftShift(a: BigInt, n: number) {
    const binaryA = this.bigIntToBinary(a);

    const binaryResult = binaryA.slice(n - 1).padEnd(binaryA.length, '0');

    return this.binaryToBigInt(binaryResult);
  }
}