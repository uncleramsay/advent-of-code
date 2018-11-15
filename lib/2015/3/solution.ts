import { readFileSync } from 'fs';
import { set } from 'lodash';

interface IData {
  robotX: number;
  robotY: number;
  santaX: number;
  santaY: number;
  visitedCells: Record<number, number>;
}

class Solution {
  private data: IData;
  private input: string;

  constructor() {
    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
  }

  private processData(enableRobot: boolean = false): void {
    this.data = {
      robotX: 0,
      robotY: 0,
      santaX: 0,
      santaY: 0,
      visitedCells: {},
    };

    for (let i = 0; i < this.input.length; i++) {
      const char = this.input[i];
      const isRobot = enableRobot && i % 2 !== 0;

      switch (char) {
        case '^': {
          const prop = isRobot ? 'robotY' : 'santaY';
          this.data[prop] += 1;
          break;
        }

        case '>': {
          const prop = isRobot ? 'robotX' : 'santaX';
          this.data[prop] += 1;
          break;
        }

        case 'v': {
          const prop = isRobot ? 'robotY' : 'santaY';
          this.data[prop] -= 1;
          break;
        }

        case '<': {
          const prop = isRobot ? 'robotX' : 'santaX';
          this.data[prop] -= 1;
          break;
        }
      }

      this.markLocation(isRobot);
    }
  }

  private markLocation(isRobot: boolean) {
    const x = isRobot ? this.data.robotX : this.data.santaX;
    const y = isRobot ? this.data.robotY : this.data.santaY;

    set(this.data, ['visitedCells', x, y], true);
  }

  private countVisitedCells(): number {
    let count = 0;
    for (const x in this.data.visitedCells) {
      count += Object.keys(this.data.visitedCells[x]).length;
    }

    return count;
  }

  public part1() {
    this.processData();
    return this.countVisitedCells();
  }

  public part2() {
    this.processData(true);
    return this.countVisitedCells();
  }
}

export default Solution;
