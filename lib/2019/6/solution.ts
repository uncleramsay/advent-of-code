import { readFileSync } from 'fs';
import { without } from 'lodash';

interface IObject {
  orbits?: string;
}

class Solution {
  private input: string;
  private objects: Record<string, IObject>;

  constructor() {
    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
    this.objects = {};
    this.processData();
  }

  private processData(): void {
    for (const line of this.input.split('\n')) {
      const [left, right] = line.split(')');

      if (!this.objects[left]) {
        this.objects[left] = {};
      }

      this.objects[right] = {
        orbits: left,
      };
    }
  }

  private countOrbits(key: string): number {
    const object = this.objects[key];
    if (!object.orbits) {
      return 0;
    }

    return 1 + this.countOrbits(object.orbits);
  }

  private getObjectPath(key: string): string[] {
    const rval = [key];

    let object = this.objects[key];
    while (object.orbits) {
      rval.push(object.orbits);
      object = this.objects[object.orbits];
    }

    return rval;
  }

  public part1() {
    let orbitCount = 0;

    for (const key in this.objects) {
      orbitCount += this.countOrbits(key);
    }

    return orbitCount;
  }

  public part2() {
    const myPath = this.getObjectPath('YOU');
    const santaPath = this.getObjectPath('SAN');

    for (let myIndex = 0; myIndex < myPath.length; myIndex++) {
      const key = myPath[myIndex];
      const santaIndex = santaPath.indexOf(key);
      if (santaIndex > -1) {
        return myIndex - 1 + (santaIndex - 1);
      }
    }

    throw "Couldn't find result";
  }
}

export default Solution;
