import { readFileSync } from 'fs';

class Solution {
  private bounds: number[];
  private input: string;

  constructor() {
    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
    this.processData();
  }

  private processData(): void {
    this.bounds = this.input.split('-').map(bound => parseInt(bound, 10));
  }

  private passwordHasDoubleCharacter(password: string): boolean {
    return /(.)\1/.test(password);
  }

  private passwordHasDoubleCharacterAndNoMore(password: string): boolean {
    // Should be a way to do this with regex lookbehinds, but I'm going to brute force it for now
    for (let i = 0; i < password.length - 1; i++) {
      const previousChar = i === 0 ? '' : password[i - 1];
      const char = password[i];
      const nextChar = password[i + 1];
      const furtherChar = password[i + 2];

      if (previousChar === char || nextChar !== char || furtherChar === char) {
        continue;
      }

      return true;
    }

    return false;
  }

  private passwordDigitsNeverDecrease(password: string): boolean {
    for (let i = 1; i < password.length; i++) {
      const digit = parseInt(password[i], 10);
      const previousDigit = parseInt(password[i - 1], 10);

      if (digit < previousDigit) {
        return false;
      }
    }

    return true;
  }

  public part1() {
    const validPasswords: number[] = [];

    for (
      let password = this.bounds[0];
      password <= this.bounds[1];
      password++
    ) {
      if (
        this.passwordHasDoubleCharacter(`${password}`) &&
        this.passwordDigitsNeverDecrease(`${password}`)
      ) {
        validPasswords.push(password);
      }
    }

    return validPasswords.length;
  }

  public part2() {
    const validPasswords: number[] = [];

    for (
      let password = this.bounds[0];
      password <= this.bounds[1];
      password++
    ) {
      if (
        this.passwordHasDoubleCharacterAndNoMore(`${password}`) &&
        this.passwordDigitsNeverDecrease(`${password}`)
      ) {
        validPasswords.push(password);
      }
    }

    return validPasswords.length;
  }
}

export default Solution;
