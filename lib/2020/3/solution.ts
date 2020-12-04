import { readFileSync } from 'fs';

type Coordinates = [number, number];

class Solution {
  private input: string;
  private rows: string[];

  constructor() {
    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
    this.processData();
  }

  private processData(): void {
    this.rows = this.input.split('\n');
  }

  private countTrees(stepsRight: number, stepsDown: number): number {
    let treeCount = 0;
    let position: Coordinates = [0, 0];

    while (position[1] + stepsDown < this.rows.length) {
      const x = position[0] + stepsRight;
      const y = position[1] + stepsDown;

      const row = this.rows[y];
      const cell = row[x % row.length];

      if (cell === '#') {
        treeCount += 1;
      }

      position = [x, y];
    }

    return treeCount;
  }

  public part1() {
    return this.countTrees(3, 1);
  }

  public part2() {
    return (
      this.countTrees(1, 1) *
      this.countTrees(3, 1) *
      this.countTrees(5, 1) *
      this.countTrees(7, 1) *
      this.countTrees(1, 2)
    );
  }
}

export default Solution;
