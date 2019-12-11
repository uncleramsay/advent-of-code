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

  public async part1(): Promise<void> {
    console.log('Provide "1" to the requested input');
    await this.computer.runProgram();
  }

  public async part2(): Promise<void> {
    console.log('Provide "5" to the requested input');
    await this.computer.runProgram();
  }
}

export default Solution;
