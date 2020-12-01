import { readFileSync } from 'fs';

class Solution {
  private input: string;
  private numbers: number[];

  constructor() {
    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
    this.processData();
  }

  private processData(): void {
    this.numbers = this.input.split('\n').map(num => parseInt(num, 10));
  }

  public part1() {
    for (let i = 0; i < this.numbers.length; i++) {
      for (let j = i+1; j < this.numbers.length; j++) {
        const a = this.numbers[i];
        const b = this.numbers[j];

        if (a + b === 2020) {
          return a * b;
        }
      }
    }

    return null;
  }

  public part2() {
    for (let i = 0; i < this.numbers.length; i++) {
      for (let j = i+1; j < this.numbers.length; j++) {
        for (let k = i+2; k < this.numbers.length; k++) {
          const a = this.numbers[i];
          const b = this.numbers[j];
          const c = this.numbers[k];

          if (a + b + c === 2020) {
            return a * b * c;
          }
        }
      }
    }

    return null;
  }
}

export default Solution;
