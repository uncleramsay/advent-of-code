import { readFileSync } from 'fs';

const PREAMBLE_LENGTH = 25;

class Solution {
  private input: string;
  private numbers: number[];

  constructor() {
    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
    this.processData();
  }

  private processData(): void {
    this.numbers = this.input.split('\n').map((num) => parseInt(num, 10));
  }

  private isNumberValid(target: number, index: number): boolean {
    for (let i = index - PREAMBLE_LENGTH; i < index - 1; i++) {
      for (let j = index - PREAMBLE_LENGTH + 1; j < index; j++) {
        const num1 = this.numbers[i];
        const num2 = this.numbers[j];

        if (num1 + num2 === target) {
          return true;
        }
      }
    }

    return false;
  }

  private findContiguousSum(target: number): [number, number] {
    for (let i = 0; i < this.numbers.length - 1; i++) {
      let sum = this.numbers[i];
      let j = i + 1;

      for (; j < this.numbers.length && sum < target; j++) {
        sum += this.numbers[j];
      }

      if (sum === target) {
        return [i, j];
      }
    }

    throw `Couldn't find contiguous list for ${target}`;
  }

  public part1() {
    let valid = true;
    let index = PREAMBLE_LENGTH - 1;
    while (valid) {
      index += 1;
      const num = this.numbers[index];
      valid = this.isNumberValid(num, index);
    }

    return this.numbers[index];
  }

  public part2() {
    const target = this.part1();
    const bounds = this.findContiguousSum(target);
    const list = this.numbers.slice(bounds[0], bounds[1]);

    return Math.min(...list) + Math.max(...list);
  }
}

export default Solution;
