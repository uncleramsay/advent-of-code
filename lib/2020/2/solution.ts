import { readFileSync } from 'fs';

class Solution {
  private input: string;
  private passwordRules: string[];

  constructor() {
    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
    this.processData();
  }

  private processData(): void {
    this.passwordRules = this.input.split('\n');
  }

  private oldPasswordIsValid(
    minNum: number,
    maxNum: number,
    targetChar: string,
    password: string,
  ): boolean {
    let count = 0;

    for (const char of password) {
      if (char === targetChar) {
        count += 1;
      }
    }

    return count >= minNum && count <= maxNum;
  }

  private newPasswordIsValid(
    firstPosition: number,
    secondPosition: number,
    targetChar: string,
    password: string,
  ): boolean {
    return (
      (password[firstPosition - 1] === targetChar &&
        password[secondPosition - 1] !== targetChar) ||
      (password[firstPosition - 1] !== targetChar &&
        password[secondPosition - 1] === targetChar)
    );
  }

  private countValidPasswords(newSyntax: boolean = false): number {
    let validPasswords = 0;

    for (const passwordRule of this.passwordRules) {
      const matches = passwordRule.match(/^(\d+)\-(\d+) (\w)\: (.+)$/);
      if (!matches || !matches[0]) {
        throw "Couldn't understand password rule syntax";
      }

      const [minNum, maxNum, targetChar, password] = matches.slice(1);
      const validator = newSyntax
        ? this.newPasswordIsValid
        : this.oldPasswordIsValid;

      if (
        validator(
          parseInt(minNum, 10),
          parseInt(maxNum, 10),
          targetChar,
          password,
        )
      ) {
        validPasswords += 1;
      }
    }

    return validPasswords;
  }

  public part1() {
    return this.countValidPasswords();
  }

  public part2() {
    return this.countValidPasswords(true);
  }
}

export default Solution;
