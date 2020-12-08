import { readFileSync } from 'fs';

interface BoardingPassInfo {
  id: number;
  row: number;
  column: number;
}

class Solution {
  private input: string;
  private passes: string[];

  constructor() {
    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
    this.processData();
  }

  private processData(): void {
    this.passes = this.input.split('\n');
  }

  private caclulatePartition(
    lowerBound: number,
    upperBound: number,
    sequence: string[],
  ): number {
    for (const char of sequence) {
      const diff = upperBound + 1 - lowerBound;
      const halfDiff = diff / 2;

      if (char === 'F' || char === 'L') {
        upperBound = upperBound - halfDiff;
      } else if (char === 'B' || char === 'R') {
        lowerBound = lowerBound + halfDiff;
      } else {
        throw `Bad row parameter: ${char}`;
      }
    }

    if (upperBound !== lowerBound) {
      throw `Couldn't partition sequence: ${sequence.join('')}`;
    }

    return upperBound;
  }

  private getBoardingPassInfo(pass: string): BoardingPassInfo {
    const matches = pass.match(/^([FB]{7})([LR]{3})$/);
    if (!matches) {
      throw `Couldn't understand boarding pass: ${pass}`;
    }

    const row = this.caclulatePartition(0, 127, matches[1].split(''));
    const column = this.caclulatePartition(0, 7, matches[2].split(''));

    return {
      id: this.calculateSeatId(row, column),
      row,
      column,
    };
  }

  private calculateSeatId(row: number, column: number) {
    return row * 8 + column;
  }

  public part1() {
    let highestId = 0;

    for (const pass of this.passes) {
      const id = this.getBoardingPassInfo(pass).id;
      if (id > highestId) {
        highestId = id;
      }
    }

    return highestId;
  }

  public part2() {
    let seats: Array<number[]> = [];

    for (const pass of this.passes) {
      const info = this.getBoardingPassInfo(pass);
      if (!seats[info.row]) {
        seats[info.row] = [];
      }

      if (seats[info.row][info.column] !== undefined) {
        throw `Seat ${info.row}, ${info.column} already encountered`;
      }

      seats[info.row][info.column] = info.id;
    }

    const ids = seats.flat();

    let missingSeats: Array<[number, number]> = [];
    for (let i = 0; i < 127; i++) {
      for (let j = 0; j < 7; j++) {
        if (seats[i]?.[j] === undefined) {
          const seatId = this.calculateSeatId(i, j);

          if (ids.includes(seatId + 1) && ids.includes(seatId - 1)) {
            missingSeats.push([i, j]);
          }
        }
      }
    }

    if (missingSeats.length > 1) {
      throw `Found more than one missing seat`;
    }

    return this.calculateSeatId(missingSeats[0][0], missingSeats[0][1]);
  }
}

export default Solution;
