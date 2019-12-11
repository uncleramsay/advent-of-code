import { readFileSync } from 'fs';
import IntCodeComputer from '../IntCodeComputer';

class Solution {
  private input: string;
  private integers: number[];
  private computer: IntCodeComputer;

  constructor() {
    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
    this.processData();
    this.computer = new IntCodeComputer([...this.integers]);
  }

  private processData(): void {
    this.integers = this.input.split(',').map(input => parseInt(input, 10));
  }

  public async part1(): Promise<string> {
    this.computer.setMemoryValue(1, 12);
    this.computer.setMemoryValue(2, 2);

    await this.computer.runProgram();

    return `${this.computer.getMemoryValue(0)}`;
  }

  public async part2(): Promise<string> {
    const resultToMatch = 19690720;

    for (let noun = 0; noun < 100; noun++) {
      for (let verb = 0; verb < 100; verb++) {
        console.log(`Attempting ${noun}, ${verb}`);

        this.computer.setMemory([...this.integers]);
        this.computer.setMemoryValue(1, noun);
        this.computer.setMemoryValue(2, verb);

        await this.computer.runProgram();
        const result = this.computer.getMemoryValue(0);
        if (result === resultToMatch) {
          return `${100 * noun + verb}`;
        }

        console.log(`Result is ${result}`);
        console.log();
      }
    }

    throw "Couldn't find an answer";
  }
}

export default Solution;
