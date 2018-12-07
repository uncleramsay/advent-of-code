import { readFileSync } from 'fs';
import { sumBy } from 'lodash';

class Solution {
  private input: string;
  private twos: number;
  private threes: number;

  constructor() {
    this.twos = 0;
    this.threes = 0;
    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
    this.processData();
  }

  private processData(): void {
    this.input.split('\n').forEach((line: string) => {
      const chars = this.analyseId(line);

      const twos = sumBy(Object.values(chars), (amount: number) => {
        return amount === 2 ? 1 : 0;
      });

      if (twos > 0) {
        this.twos += 1;
      }

      const threes = sumBy(Object.values(chars), (amount: number) => {
        return amount === 3 ? 1 : 0;
      });

      if (threes > 0) {
        this.threes += 1;
      }
    });
  }

  private findMatch(): string | undefined {
    const lines = this.input.split('\n').sort();

    for (let i = 0; i < lines.length; i++) {
      const line1 = lines[i];
      const line2 = lines[i+1];

      const chars1 = line1.split('');
      const chars2 = line2.split('');

      let differences = 0;
      for (let j = 0; j < chars1.length; j++) {
        if (chars1[j] !== chars2[j]) {
          differences += 1;
        }
      }

      if (differences === 1) {
        return chars1.filter((char: string, index: number) => char === chars2[index]).join('');
      }
    }

    return undefined;
  }

  private analyseId(id: string): Record<string, number> {
    const chars: Record<string, number> = {};

    id.split('').forEach((char: string) => {
      chars[char] = chars[char] ? chars[char] + 1 : 1;
    });

    return chars;
  }

  public part1() {
    return this.twos * this.threes;
  }

  public part2() {
    return this.findMatch();
  }
}

export default Solution;
