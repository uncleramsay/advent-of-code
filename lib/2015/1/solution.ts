import { readFileSync } from 'fs';
import { isUndefined } from 'lodash';

interface IData {
  basementEntry?: number;
  down: number;
  up: number;
}

class Solution {
  private data: IData;
  private input: string;

  constructor() {
    this.data = {
      down: 0,
      up: 0,
    };

    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
    this.processData();
  }

  private processData(): void {
    for (let i = 0; i < this.input.length; i++) {
      const char = this.input[i];

      if (char === '(') {
        this.data.up += 1;
      } else if (char === ')') {
        this.data.down += 1;
      }

      if (isUndefined(this.data.basementEntry) && this.getFinalFloor() < 0) {
        this.data.basementEntry = i + 1;
      }
    }
  }

  private getFinalFloor(): number {
    return this.data.up - this.data.down;
  }

  public part1() {
    return this.getFinalFloor();
  }

  public part2() {
    return this.data.basementEntry;
  }
}

export default Solution;
