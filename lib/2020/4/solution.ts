import { readFileSync } from 'fs';
import { createNoSubstitutionTemplateLiteral } from 'typescript';

type Passport = Record<string, string>;

class Solution {
  private input: string;
  private passports: Passport[];

  constructor() {
    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
    this.processData();
  }

  private processData(): void {
    const unProcessedPassports = this.input.split('\n\n');

    this.passports = unProcessedPassports.map((data: string) => {
      return data.split(/[\n|\s]/).reduce((acc, field) => {
        const parts = field.split(':');
        return {
          ...acc,
          [parts[0]]: parts[1],
        };
      }, {});
    });
  }

  private passportHasRequiredFields(passport: Passport): boolean {
    const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

    for (let i = 0; i < requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!Object.keys(passport).includes(field)) {
        return false;
      }
    }

    return true;
  }

  private passportIsValid(passport: Passport): boolean {
    if (
      !this.passportHasRequiredFields(passport) ||
      !this.byrIsValid(passport.byr) ||
      !this.iyrIsValid(passport.iyr) ||
      !this.eyrIsValid(passport.eyr) ||
      !this.hgtIsValid(passport.hgt) ||
      !this.hclIsValid(passport.hcl) ||
      !this.eclIsValid(passport.ecl) ||
      !this.pidIsValid(passport.pid)
    ) {
      return false;
    }

    return true;
  }

  private isValidYear(year: string, minYear: number, maxYear: number): boolean {
    return (
      /^\d{4}$/.test(year) &&
      parseInt(year, 10) >= minYear &&
      parseInt(year, 10) <= maxYear
    );
  }

  private byrIsValid(byr: string) {
    return this.isValidYear(byr, 1920, 2002);
  }

  private iyrIsValid(iyr: string) {
    return this.isValidYear(iyr, 2010, 2020);
  }

  private eyrIsValid(eyr: string) {
    return this.isValidYear(eyr, 2020, 2030);
  }

  private hgtIsValid(hgt: string) {
    const matches = hgt.match(/^(\d+)(cm|in)$/);
    if (!matches) {
      return false;
    }

    if (matches[2] === 'cm') {
      return parseInt(matches[1], 10) >= 150 && parseInt(matches[1]) <= 193;
    } else if (matches[2] === 'in') {
      return parseInt(matches[1], 10) >= 59 && parseInt(matches[1], 10) <= 76;
    }

    throw 'Should never get here';
  }

  private hclIsValid(hcl: string) {
    return /^#[0-9|a-f]{6}$/.test(hcl);
  }

  private eclIsValid(ecl: string) {
    return /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(ecl);
  }

  private pidIsValid(pid: string) {
    return /^\d{9}$/.test(pid);
  }

  private countPassports(validator: (passport: Passport) => boolean): number {
    return this.passports.reduce((acc, passport) => {
      if (validator(passport)) {
        acc += 1;
      }

      return acc;
    }, 0);
  }

  public part1() {
    return this.countPassports(this.passportHasRequiredFields.bind(this));
  }

  public part2() {
    return this.countPassports(this.passportIsValid.bind(this));
  }
}

export default Solution;
