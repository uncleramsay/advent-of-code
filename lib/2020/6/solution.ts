import { readFileSync } from 'fs';

class Solution {
  private input: string;
  private groups: string[][];

  constructor() {
    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
    this.groups = [];
    this.processData();
  }

  private processData(): void {
    this.input.split('\n\n').forEach((group) => {
      this.groups.push(group.split('\n'));
    });
  }

  public part1() {
    let total = 0;

    for (const group of this.groups) {
      const groupAnswers = new Set();

      for (const person of group) {
        for (const answer of person.split('')) {
          groupAnswers.add(answer);
        }
      }

      total += groupAnswers.size;
    }

    return total;
  }

  public part2() {
    let total = 0;

    for (const group of this.groups) {
      const groupAnswers = new Set();
      const checked: Record<string, boolean> = {};

      for (const person of group) {
        for (const answer of person.split('')) {
          if (checked[answer]) {
            continue;
          }

          const allHaveAnswer = group.every((groupPerson) => {
            return groupPerson.includes(answer);
          });

          if (allHaveAnswer) {
            groupAnswers.add(answer);
          }

          checked[answer] = true;
        }
      }

      total += groupAnswers.size;
    }

    return total;
  }
}

export default Solution;
