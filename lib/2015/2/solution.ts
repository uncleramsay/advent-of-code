import { readFileSync } from 'fs';

interface IBox {
  height: number;
  length: number;
  width: number;
}

class Solution {
  private input: string;
  private boxes: IBox[];

  constructor() {
    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
    this.processData();
  }

  private processData(): void {
    this.boxes = this.input.split('\n').map(line => {
      const [length, width, height] = line
        .split('x')
        .map(dimension => parseInt(dimension, 10));
      return { length, width, height };
    });
  }

  public part1(): number {
    let totalPaper = 0;

    for (const box of this.boxes) {
      const areas = [
        box.length * box.width,
        box.width * box.height,
        box.height * box.length,
      ];

      totalPaper +=
        areas.reduce((acc, area) => acc + area) * 2 + Math.min(...areas);
    }

    return totalPaper;
  }

  public part2() {
    let totalRibbon = 0;

    for (const box of this.boxes) {
      const dimensions = Object.values(box).sort((a, b) => a - b);

      totalRibbon += (dimensions[0] + dimensions[1]) * 2;
      totalRibbon += Object.values(box).reduce(
        (acc, dimension) => acc * dimension,
      );
    }

    return totalRibbon;
  }
}

export default Solution;
