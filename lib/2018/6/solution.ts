import { readFileSync } from 'fs';

interface ILocation {
  x: number;
  y: number;
  areaCount: number;
}

class Solution {
  private input: string;
  private locations: Record<string, ILocation>;
  private bounds: {
    lowerX: number;
    lowerY: number;
    upperX: number;
    upperY: number;
  };

  constructor() {
    this.bounds = {
      lowerX: Infinity,
      lowerY: Infinity,
      upperX: -Infinity,
      upperY: -Infinity,
    };
    this.locations = {};
    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
    this.processData();
  }

  private processData(): void {
    this.input.split('\n').forEach((line: string) => {
      const matches = line.match(/^(\d+), (\d+)$/);
      if (!matches) {
        console.error(`Couldn't understand line: ${line}`);
        return;
      }

      const x = parseInt(matches[1], 10);
      const y = parseInt(matches[2], 10);

      this.locations[`${x},${y}`] = { x, y, areaCount: 0 };
      this.updateBounds(x, y);
    });
  }

  private updateBounds(x: number, y: number) {
    if (x < this.bounds.lowerX) {
      this.bounds.lowerX = x;
    }
    if (x > this.bounds.upperX) {
      this.bounds.upperX = x;
    }
    if (y < this.bounds.lowerY) {
      this.bounds.lowerY = y;
    }
    if (y > this.bounds.upperY) {
      this.bounds.upperY = y;
    }
  }

  private static getManhattanDistance(
    start: ILocation,
    end: ILocation,
  ): number {
    return Math.abs(start.x - end.x) + Math.abs(start.y - end.y);
  }

  public part1() {
    const locationKeys = Object.keys(this.locations);

    // Traverse entire grid and assign every cell to a location
    for (let x = this.bounds.lowerX; x <= this.bounds.upperX; x++) {
      y: for (let y = this.bounds.lowerY; y <= this.bounds.upperY; y++) {
        let minDistance: number = Infinity;
        let minKey: string = '';

        for (let i = 0; i < locationKeys.length; i++) {
          const location = this.locations[locationKeys[i]];
          const distance = Solution.getManhattanDistance(location, {
            x,
            y,
            areaCount: 0,
          });

          if (distance < minDistance) {
            minDistance = distance;
            minKey = locationKeys[i];
          } else if (distance === minDistance) {
            continue y;
          }
        }

        this.locations[minKey].areaCount += 1;
      }
    }

    let maxArea: number = 0;
    Object.keys(this.locations).forEach((key: string) => {
      // Check infinite area
      if (this.locations[key].areaCount > maxArea) {
        maxArea = this.locations[key].areaCount;
      }
    });

    console.log(JSON.stringify(this.locations, null, 2));
    console.log(this.bounds);

    return maxArea;
  }

  public part2() {
    return undefined;
  }
}

export default Solution;
