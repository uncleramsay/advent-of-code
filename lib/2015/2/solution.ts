import { readFileSync } from 'fs';
import { tail } from 'lodash';

interface IData {
  paper: number;
  ribbon: number;
}

class Solution {
  private data: IData;
  private input: string;

  constructor() {
    this.data = {
      paper: 0,
      ribbon: 0,
    };
    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
    this.processData();
  }

  private processData(): void {
    const lines = this.input.split('\n');
    lines.forEach(line => {
      const matches = line.match(/^(\d+)x(\d+)x(\d+)$/);
      if (!matches) {
        console.error(`Couldn't parse line: ${line}`);
      }

      const sides = tail(matches)
        .map((side: string) => parseInt(side, 10))
        .sort((a: number, b: number) => a - b);

      const [l, w, h] = sides; // Order doesn't make any difference

      const surface = 2 * l * w + 2 * w * h + 2 * h * l;
      const slack = l * w; // Sorted, so guaranteed to be smallest side

      const ribbon = 2 * l + 2 * w;
      const bow = l * w * h;

      this.data.paper += surface + slack;
      this.data.ribbon += ribbon + bow;
    });
  }

  public part1() {
    return this.data.paper;
  }

  public part2() {
    return this.data.ribbon;
  }
}

export default Solution;
