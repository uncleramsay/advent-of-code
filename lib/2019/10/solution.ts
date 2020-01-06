import { readFileSync } from 'fs';

interface IAsteroid {
  asteroidsInView?: number;
  colIndex: number;
  rowIndex: number;
}

interface IRelativeAsteroid extends IAsteroid {
  angle: number;
}

class Solution {
  private input: string;
  private map: number[][] = [];

  constructor() {
    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
    this.processData();
  }

  private processData(): void {
    this.input.split('\n').forEach((line: string) => {
      this.map.push(
        line.split('').map((char: string) => (char === '#' ? 1 : 0)),
      );
    });
  }

  private findVisibleSattelites(
    initialRowIndex: number,
    initialColIndex: number,
  ): number {
    let visibleSattelites: IRelativeAsteroid[] = [];

    for (let rowIndex = 0; rowIndex < this.map.length; rowIndex++) {
      const row = this.map[rowIndex];

      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        if (rowIndex === initialRowIndex && colIndex === initialColIndex) {
          continue;
        }

        const cell = row[colIndex];

        if (cell === 0) {
          continue;
        }

        const angle =
          (Math.atan2(rowIndex - initialRowIndex, colIndex - initialColIndex) *
            180) /
          Math.PI;

        if (
          visibleSattelites.filter(sattelite => sattelite.angle === angle)
            .length
        ) {
          continue;
        }

        visibleSattelites.push({
          angle,
          colIndex,
          rowIndex,
        });
      }
    }

    return visibleSattelites.length;
  }

  private findOptimalLocation(): IAsteroid {
    let rval: IAsteroid = { asteroidsInView: 0, colIndex: 0, rowIndex: 0 };

    for (let rowIndex = 0; rowIndex < this.map.length; rowIndex++) {
      const row = this.map[rowIndex];

      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const cell = row[colIndex];

        if (cell === 0) {
          continue;
        }

        const asteroidsInView = this.findVisibleSattelites(rowIndex, colIndex);
        this.map[rowIndex][colIndex] = asteroidsInView;

        if (asteroidsInView > (rval.asteroidsInView || 0)) {
          rval = {
            asteroidsInView,
            colIndex,
            rowIndex,
          };
        }
      }
    }

    return rval;
  }

  private calculateDistance(options: {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  }): number {
    let xDistance = options.endX - options.startX;
    let yDistance = options.endY - options.startY;

    xDistance *= xDistance;
    yDistance *= yDistance;

    return Math.sqrt(xDistance + yDistance);
  }

  public part1() {
    const optimalLocation = this.findOptimalLocation();
    return optimalLocation.asteroidsInView;
  }

  public part2() {
    const optimalLocation = this.findOptimalLocation();

    let asteroids: IRelativeAsteroid[] = [];
    for (let rowIndex = 0; rowIndex < this.map.length; rowIndex++) {
      const row = this.map[rowIndex];
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        if (
          rowIndex === optimalLocation.rowIndex &&
          colIndex === optimalLocation.colIndex
        ) {
          continue;
        }

        if (row[colIndex] === 0) {
          continue;
        }

        const angle =
          (Math.atan2(
            rowIndex - optimalLocation.rowIndex,
            colIndex - optimalLocation.colIndex,
          ) *
            180) /
          Math.PI;

        asteroids.push({
          angle,
          colIndex,
          rowIndex,
        });
      }
    }

    asteroids = asteroids.sort((a: IRelativeAsteroid, b: IRelativeAsteroid) => {
      if (a.angle === b.angle) {
        const aDistance = this.calculateDistance({
          startX: optimalLocation.colIndex,
          endX: a.colIndex,
          startY: optimalLocation.rowIndex,
          endY: a.rowIndex,
        });
        const bDistance = this.calculateDistance({
          startX: optimalLocation.colIndex,
          endX: b.colIndex,
          startY: optimalLocation.rowIndex,
          endY: b.rowIndex,
        });

        return bDistance > aDistance ? -1 : 1;
      }

      return b.angle > a.angle ? -1 : 1;
    });

    // Start angle at -90
    while (asteroids[0].angle < -90) {
      asteroids.push(asteroids.shift() as IRelativeAsteroid);
    }

    // Move duplicate angles to end
    for (let i = 1; i < asteroids.length - 4; i++) {
      const lastAsteroid = asteroids[i - 1];
      const asteroid = asteroids[i];

      if (asteroid.angle !== lastAsteroid.angle) {
        continue;
      }

      asteroids.push(asteroids.splice(i, 1)[0]);
      i -= 1;
    }

    const asteroid200 = asteroids[199];

    return asteroid200.colIndex * 100 + asteroid200.rowIndex;
  }
}

export default Solution;
