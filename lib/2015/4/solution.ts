import { readFileSync } from 'fs';
import * as md5 from 'md5';
import { clearLine, cursorTo } from 'readline';

const LOG_INTERVAL = 1000;

class Solution {
  private input: string;

  constructor() {
    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
  }

  private log(i: number) {
    clearLine(process.stdout, 0);
    cursorTo(process.stdout, 0);
    process.stdout.write(`${i}`);
  }

  private calculateHash(i: number): string {
    if (i % LOG_INTERVAL === 0) {
      this.log(i);
    }

    return md5(`${this.input}${i}`);
  }

  private performLoop(numZeros: number): number {
    let i = 1;
    while (true) {
      const hash = this.calculateHash(i);
      if (new RegExp(`^0{${numZeros}}`).test(hash)) {
        clearLine(process.stdout, 0);
        return i;
      }

      i += 1;
    }
  }

  public part1() {
    return this.performLoop(5);
  }

  public part2() {
    return this.performLoop(6);
  }
}

export default Solution;
