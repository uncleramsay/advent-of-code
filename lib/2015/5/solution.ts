import { readFileSync } from 'fs';

class Solution {
  private input: string;
  private words: string[];

  constructor() {
    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
    this.processData();
  }

  private processData(): void {
    this.words = this.input.split('\n');
  }

  private has3Vowels(word: string): boolean {
    return /.*[aeiou].*[aeiou].*[aeiou].*/.test(word);
  }

  private hasRepeatedLetter(word: string): boolean {
    return /(.)\1/.test(word);
  }

  private hasForbiddenString(word: string): boolean {
    return (
      word.includes('ab') ||
      word.includes('cd') ||
      word.includes('pq') ||
      word.includes('xy')
    );
  }

  private hasRepeatedPair(word: string): boolean {
    return /(..).*\1/.test(word);
  }

  private hasRepeatedSeparatedLetter(word: string): boolean {
    return /(.).\1/.test(word);
  }

  public part1() {
    let count = 0;

    for (const word of this.words) {
      if (
        this.has3Vowels(word) &&
        this.hasRepeatedLetter(word) &&
        !this.hasForbiddenString(word)
      ) {
        count += 1;
      }
    }

    return count;
  }

  public part2() {
    let count = 0;

    for (const word of this.words) {
      if (this.hasRepeatedPair(word) && this.hasRepeatedSeparatedLetter(word)) {
        count += 1;
      }
    }

    return count;
  }
}

export default Solution;
