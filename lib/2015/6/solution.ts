import { readFileSync } from 'fs';
import { reduce, sumBy, tail } from 'lodash';

interface IData {
  [index: string]: number;
}

class Solution {
  private data: IData;
  private input: string;

  constructor() {
    this.data = {};
    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
  }

  private getId(x: number, y: number) {
    return `${x},${y}`;
  }

  private processData(ancientNordic: boolean = false): void {
    const lines = this.input.split('\n');
    lines.forEach((line: string) => {
      const matches = line.match(/^(.+) (\d+),(\d+) through (\d+),(\d+)$/);
      if (!matches) {
        console.error(`Couldn't understand line: ${line}`);
        return;
      }
      const [instruction, startX, startY, endX, endY] = tail(matches);

      switch (instruction) {
        case 'turn on': {
          this.processCells(
            startX,
            startY,
            endX,
            endY,
            (x: number, y: number) => {
              const id = this.getId(x, y);
              const value = ancientNordic
                ? this.data[id]
                  ? this.data[id] + 1
                  : 1
                : 1;
              this.data[id] = value;
            },
          );
          break;
        }

        case 'toggle': {
          this.processCells(
            startX,
            startY,
            endX,
            endY,
            (x: number, y: number) => {
              const id = this.getId(x, y);
              let value;
              if (ancientNordic) {
                value = this.data[id] ? this.data[id] + 2 : 2;
              } else {
                value = this.data[id] ? 0 : 1;
              }

              this.data[id] = value;
            },
          );
          break;
        }

        case 'turn off': {
          this.processCells(
            startX,
            startY,
            endX,
            endY,
            (x: number, y: number) => {
              const id = this.getId(x, y);
              const value = ancientNordic
                ? this.data[id]
                  ? this.data[id] - 1
                  : 0
                : 0;
              this.data[id] = value;
            },
          );
          break;
        }
      }
    });
  }

  private processCells(
    startX: string,
    startY: string,
    endX: string,
    endY: string,
    actionFn: (x: number, y: number) => void,
  ): void {
    for (let x = parseInt(startX, 10); x <= parseInt(endX, 10); x++) {
      for (let y = parseInt(startY, 10); y <= parseInt(endY, 10); y++) {
        actionFn(x, y);
      }
    }
  }

  private countLights(): number {
    return reduce(
      this.data,
      (count, val) => {
        return val ? count + val : count;
      },
      0,
    );
  }

  public part1() {
    this.processData();
    return this.countLights();
  }

  public part2() {
    this.processData(true);
    return this.countLights();
  }
}

export default Solution;
