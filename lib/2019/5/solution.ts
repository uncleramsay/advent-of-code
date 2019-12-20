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

  public async part1(): Promise<number> {
    this.computer.setInput(1);
    await this.computer.runProgram();
    return this.computer.getOutput();
  }

  public async part2(): Promise<number> {
    this.computer.setMemory([...this.integers]); // Reset memory after part 1
    this.computer.setInput(5);
    await this.computer.runProgram();
    return this.computer.getOutput();
  }
}

export default Solution;
