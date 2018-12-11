import { readFileSync } from 'fs';

class Solution {
  private input: string;
  private reducedPolymer: string;

  constructor() {
    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
  }

  private processData(chars: string[]): void {
    let oldCharCount = chars.length;
    let newCharCount = 0;

    while (oldCharCount !== newCharCount) {
      oldCharCount = chars.length;
      chars = this.analysePolymer(chars);
      newCharCount = chars.length;
    }

    this.reducedPolymer = chars.join('');
  }

  private analysePolymer(chars: string[]): string[] {
    for (let i = 0; i < chars.length; i++) {
      const one = chars[i];
      const two = chars[i + 1];

      if (
        one &&
        two &&
        one !== two &&
        (one === two.toUpperCase() || one.toUpperCase() === two)
      ) {
        chars.splice(i, 2);
        return chars;
      }
    }

    return chars;
  }

  public part1() {
    const chars: string[] = this.input.split('');
    this.processData(chars);
    return this.reducedPolymer.length;
  }

  public part2() {
    let smallestPolymer = Infinity;

    for (let i = 0; i < 26; i++) {
      const char = String.fromCharCode(97 + i);
      console.log(`Testing without ${char}...`);

      const regex = new RegExp(char, 'ig');
      const chars = this.input.replace(regex, '').split('');
      this.processData(chars);
      console.log(`${this.reducedPolymer.length} characters`);
      console.log('');

      if (this.reducedPolymer.length < smallestPolymer) {
        smallestPolymer = this.reducedPolymer.length;
      }
    }

    return smallestPolymer;
  }
}

export default Solution;
