import { readFileSync } from 'fs';
import * as md5 from 'md5';

class Solution {
  private input: string;

  constructor() {
    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
    this.processData();
  }

  private processData(): void {}

  private findHashIndex(numZeroes: number): number {
    let i = 0;
    while (true) {
      const key = `${this.input}${i}`;
      const hash = md5(key);

      const regex = new RegExp(`^0{${numZeroes}}`);
      if (regex.test(hash)) {
        return i;
      }

      i += 1;
    }
  }

  public part1(): number {
    return this.findHashIndex(5);
  }

  public part2() {
    return this.findHashIndex(6);
  }
}

export default Solution;
