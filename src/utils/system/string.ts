function generateRandomCharInRange(min: number = 0, max: number = 65535, amount: number = 3) {
  let result = ""

  while (amount > 0) {
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    result += String.fromCharCode(number);
  }

  return result
}