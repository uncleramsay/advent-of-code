import { readFileSync } from 'fs';

class Solution {
  private input: string;
  private frequency: number;
  private history: number[];

  constructor() {
    this.frequency = 0;
    this.history = [];
    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
  }

  private processData(returnOnDuplicate: boolean = false): void | number {
    const lines = this.input.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line: string = lines[i];

      this.frequency += parseInt(line, 10);

      if (returnOnDuplicate && this.history.includes(this.frequency)) {
        return this.frequency;
      }

      this.history.push(this.frequency);
    }
  }

  public part1() {
    this.processData();
    return this.frequency;
  }

  public part2() {
    while(true) {
      const output = this.processData(true);
      if (typeof output === 'number') {
        return output;
      }
    }
  }
}

export default Solution;
