import { readFileSync } from 'fs';

class Solution {
  private input: string;
  private masses: number[];

  constructor() {
    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
    this.processData();
  }

  private processData(): void {
    const lines = this.input.split('\n');
    this.masses = lines.map(line => parseInt(line, 10));
  }

  private calculateFuelRequired(mass: number): number {
    const fuelRequired = Math.floor(mass / 3) - 2;
    return fuelRequired > 0 ? fuelRequired : 0;
  }

  public part1() {
    return this.masses.reduce((total: number, mass: number) => {
      return total + this.calculateFuelRequired(mass);
    }, 0);
  }

  public part2() {
    let totalFuel = 0;

    for (const mass of this.masses) {
      const fuelRequired = this.calculateFuelRequired(mass);

      let additionalFuel = fuelRequired;
      while (additionalFuel > 0) {
        totalFuel += additionalFuel;
        additionalFuel = this.calculateFuelRequired(additionalFuel);
      }
    }

    return totalFuel;
  }
}

export default Solution;
