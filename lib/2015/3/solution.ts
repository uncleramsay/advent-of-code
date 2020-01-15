import { readFileSync } from 'fs';

type Instruction = '^' | 'v' | '>' | '<';

class Solution {
  private input: string;
  private instructions: Instruction[];
  private map: Record<string, number> = {};

  constructor() {
    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
    this.processData();
  }

  private processData(): void {
    this.instructions = this.input.split('') as Instruction[];
  }

  public part1(): number {
    let x = 0;
    let y = 0;

    this.map = { '0,0': 1 };

    for (const instruction of this.instructions) {
      switch (instruction) {
        case '^': {
          y += 1;
          break;
        }

        case 'v': {
          y -= 1;
          break;
        }

        case '>': {
          x += 1;
          break;
        }

        case '<': {
          x -= 1;
          break;
        }

        default: {
          throw `Couldn't understand instruction ${instruction}`;
        }
      }

      const key = `${x},${y}`;
      this.map[key] = this.map[key] ? this.map[key] + 1 : 1;
    }

    return Object.keys(this.map).length;
  }

  public part2() {
    let santaX = 0;
    let santaY = 0;
    let roboX = 0;
    let roboY = 0;

    this.map = { '0,0': 2 };

    for (let index = 0; index < this.instructions.length; index++) {
      const instruction = this.instructions[index];
      const isSanta = index % 2 === 0;

      switch (instruction) {
        case '^': {
          if (isSanta) {
            santaY += 1;
          } else {
            roboY += 1;
          }
          break;
        }

        case 'v': {
          if (isSanta) {
            santaY -= 1;
          } else {
            roboY -= 1;
          }
          break;
        }

        case '>': {
          if (isSanta) {
            santaX += 1;
          } else {
            roboX += 1;
          }
          break;
        }

        case '<': {
          if (isSanta) {
            santaX -= 1;
          } else {
            roboX -= 1;
          }
          break;
        }

        default: {
          throw `Couldn't understand instruction ${instruction}`;
        }
      }

      const key = isSanta ? `${santaX},${santaY}` : `${roboX},${roboY}`;
      this.map[key] = this.map[key] ? this.map[key] + 1 : 1;
    }

    return Object.keys(this.map).length;
  }
}

export default Solution;
