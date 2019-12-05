import { readFileSync } from 'fs';
import Wire from './Wire';
import { join } from 'path';

class Solution {
  private input: string;
  private wires: Wire[];

  constructor() {
    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
    this.processData();
  }

  private processData(): void {
    this.wires = this.input
      .split('\n')
      .map((wire: string) => new Wire(wire.split(',')));
  }

  private calculatePointDistance(point: string): number {
    const coords = point.split(',').map(coord => parseInt(coord, 10));
    const distance = Math.abs(coords[0]) + Math.abs(coords[1]);

    return distance;
  }

  public part1() {
    const crossPoints = Object.keys(Wire.findCrossPoints(this.wires));
    crossPoints.sort((a: string, b: string) => {
      return this.calculatePointDistance(a) - this.calculatePointDistance(b);
    });

    return this.calculatePointDistance(crossPoints[0]);
  }

  public part2() {
    const crossPoints = Wire.findCrossPoints(this.wires);

    const stepSums = Object.keys(crossPoints).sort((a: string, b: string) => {
      return (
        crossPoints[a].reduce((i, j) => i + j, 0) -
        crossPoints[b].reduce((i, j) => i + j, 0)
      );
    });

    return crossPoints[stepSums[0]].reduce((i, j) => i + j, 0);
  }
}

export default Solution;
