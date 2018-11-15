import { readFileSync } from 'fs';

class Solution {
  private input: string;

  constructor() {
    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
    this.processData();
  }

  private processData(): void {}

  public part1() {
    return undefined;
  }

  public part2() {
    return undefined;
  }
}

export default Solution;
