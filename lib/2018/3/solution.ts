import { readFileSync } from 'fs';
import { get, set, tail } from 'lodash';

class Solution {
  private input: string;
  private grid: number[][];
  private idOverlaps: boolean[];

  constructor() {
    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
    this.grid = [];
    this.idOverlaps = [];

    this.processData();
  }

  private processData(): void {
    this.input.split('\n').forEach((line: string) => {
      const matches = line.match(/^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/);
      if (!matches) {
        console.error(`Couldn't parse line: ${line}`);
        process.exit(1);
      }

      const [id, left, top, width, height] = tail(matches).map(
        (match: string) => parseInt(match, 10),
      );

      let overlap = false;
      for (let x = left; x < left + width; x++) {
        for (let y = top; y < top + height; y++) {
          const count: number = get(this.grid, [x, y], 0);
          if (get(this.grid, [x, y]) > 1) {
            overlap = true;
          }
          set(this.grid, [x, y], count + 1);
        }
      }

      set(this.idOverlaps, id, overlap);
    });
  }

  public part1() {
    let count = 0;

    this.grid.forEach((row: number[]) => {
      row.forEach((column: number) => {
        if (column > 1) {
          count += 1;
        }
      });
    });

    return count;
  }

  public part2() {
    // Process again to update the overlap IDs
    this.processData();

    for (let i = 0; i < this.idOverlaps.length; i++) {
      if (this.idOverlaps[i] === false) {
        return i;
      }
    }

    console.error(`Couldn't find non-overlapping ID`);
    return undefined;
  }
}

export default Solution;
