import { readFileSync } from 'fs';

class Solution {
  private input: string;
  private instructions: string[];

  constructor() {
    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
    this.processData();
  }

  private processData(): void {
    this.instructions = this.input.split('');
  }

  public part1(): number {
    let floor = 0;

    for (const instruction of this.instructions) {
      if (instruction === '(') {
        floor += 1;
      } else if (instruction === ')') {
        floor -= 1;
      } else {
        throw `Couldn't understand instruction ${instruction}`;
      }
    }

    return floor;
  }

  public part2() {
    let floor = 0;

    for (const [index, instruction] of Object.entries(this.instructions)) {
      if (instruction === '(') {
        floor += 1;
      } else if (instruction === ')') {
        floor -= 1;
      } else {
        throw `Couldn't understand instruction ${instruction}`;
      }

      if (floor < 0) {
        return parseInt(index, 10) + 1;
      }
    }

    throw `Never entered the basement`;
  }
}

export default Solution;
