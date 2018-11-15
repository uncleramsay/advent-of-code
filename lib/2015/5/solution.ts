import { readFileSync } from 'fs';

interface IData {
  naughty: string[];
  nice: string[];
}

class Solution {
  private data: IData;
  private input: string;

  constructor() {
    this.data = {
      naughty: [],
      nice: [],
    };
    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
  }

  private runPartOneTests(line: string): boolean {
    return (
      this.testVowels(line) &&
      this.testRepeatedCharacter(line) &&
      this.testBlocklist(line)
    );
  }

  private runPartTwoTests(line: string): boolean {
    return this.testRepeatedPart(line) && this.testSandwich(line);
  }

  private testVowels(line: string): boolean {
    const matches = line.match(/(a|e|i|o|u)/g);
    return matches ? matches.length >= 3 : false;
  }

  private testRepeatedCharacter(line: string): boolean {
    const matches = line.match(/(.)\1/g);
    return matches ? !!matches.length : false;
  }

  private testBlocklist(line: string): boolean {
    const blacklist = ['ab', 'cd', 'pq', 'xy'];
    for (let i = 0; i < blacklist.length; i++) {
      const entry = blacklist[i];
      if (new RegExp(entry).test(line)) {
        return false;
      }
    }

    return true;
  }

  private testRepeatedPart(line: string) {
    const matches = line.match(/(..).*\1/g);
    return matches ? !!matches.length : false;
  }

  private testSandwich(line: string) {
    const matches = line.match(/(.).\1/g);
    return matches ? !!matches.length : false;
  }

  private processData(testFn: (line: string) => boolean) {
    const lines = this.input.split('\n');
    lines.forEach((line: string) => {
      if (testFn.call(this, line)) {
        this.data.nice.push(line);
      } else {
        this.data.naughty.push(line);
      }
    });
  }

  public part1() {
    this.processData(this.runPartOneTests);
    return this.data.nice.length;
  }

  public part2() {
    this.processData(this.runPartTwoTests);
    return this.data.nice.length;
  }
}

export default Solution;
