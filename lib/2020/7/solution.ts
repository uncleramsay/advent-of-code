import { readFileSync } from 'fs';

type BagMap = Record<string, Record<string, number>>;

class Solution {
  private input: string;
  private bagMap: BagMap = {};

  constructor() {
    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
    this.processData();
  }

  private processData(): void {
    this.input.split('\n').forEach((rule) => {
      const matches = rule.match(/^(.+) bags contain (.+)\.$/);
      if (!matches) {
        throw `Couldn't understand rule ${rule}`;
      }

      const outerBag = matches[1];
      const innerBags = matches[2].split(',');

      if (innerBags[0] === 'no other bags') {
        return;
      }

      for (const innerBag of innerBags) {
        const matches = innerBag.trim().match(/^(\d+) (.+) bags?/);
        if (!matches) {
          throw `Couldn't understand inner bag ${innerBag}`;
        }

        if (!this.bagMap[outerBag]) {
          this.bagMap[outerBag] = {};
        }

        this.bagMap[outerBag][matches[2]] = parseInt(matches[1], 10);
      }
    });
  }

  private getOuterBagsForInnerBag(innerBag: string): Set<string> {
    const rval: Set<string> = new Set();

    for (const outerBag of Object.keys(this.bagMap)) {
      if (this.checkOuterBagForInnerBag(outerBag, innerBag)) {
        rval.add(outerBag);
      }
    }

    return rval;
  }

  private checkOuterBagForInnerBag(
    outerBag: string,
    innerBag: string,
  ): boolean {
    if (!this.bagMap[outerBag]) {
      return false;
    }

    if (this.bagMap[outerBag][innerBag]) {
      return true;
    }

    return Object.keys(this.bagMap[outerBag]).some((bag) => {
      return this.checkOuterBagForInnerBag(bag, innerBag);
    });
  }

  private countBagsForOuterBag(outerBag: string): number {
    if (!this.bagMap[outerBag]) {
      return 1;
    }

    return Object.keys(this.bagMap[outerBag]).reduce((acc, innerBag) => {
      if (!this.bagMap[innerBag]) {
        return acc + this.bagMap[outerBag][innerBag];
      }

      return (
        acc +
        this.bagMap[outerBag][innerBag] * this.countBagsForOuterBag(innerBag)
      );
    }, 1);
  }

  public part1() {
    return this.getOuterBagsForInnerBag('shiny gold').size;
  }

  public part2() {
    const numBags = this.countBagsForOuterBag('shiny gold');
    // Don't count the outer bag itself
    return numBags - 1;
  }
}

export default Solution;
