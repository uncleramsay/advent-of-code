import { readFileSync } from 'fs';
import IntCodeComputer from '../IntCodeComputer';

class Solution {
  private input: string;
  private integers: number[];

  constructor() {
    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
    this.processData();
  }

  private processData(): void {
    this.integers = this.input.split(',').map(input => parseInt(input, 10));
  }

  public async part1() {
    const computer = new IntCodeComputer([...this.integers]);
    computer.setInput(1);
    await computer.runProgram();

    return computer.getLastOutput();
  }

  public async part2() {
    const computer = new IntCodeComputer([...this.integers]);
    computer.setInput(2);
    await computer.runProgram();

    return computer.getLastOutput();
  }
}

export default Solution;
