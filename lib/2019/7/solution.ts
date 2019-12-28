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

  private getPermutations(input: number[]): Array<number[]> {
    const rval: Array<number[]> = [];

    const permute = (arr: number[], tmp: number[] = []) => {
      if (arr.length === 0) {
        rval.push(tmp);
      } else {
        for (let i = 0; i < arr.length; i++) {
          const curr = arr.slice();
          const next = curr.splice(i, 1);
          permute(curr.slice(), tmp.concat(next));
        }
      }
    };

    permute(input);

    return rval;
  }

  private runDownEventLoop(): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => resolve(), 0);
    });
  }

  public async part1() {
    let maxOutput = Number.MIN_SAFE_INTEGER;

    const permutations = this.getPermutations([0, 1, 2, 3, 4]);

    for (const phaseSequence of permutations) {
      console.log('Attempting phase sequence:', phaseSequence);

      const amplifierA = new IntCodeComputer([...this.integers]);
      amplifierA.setInput(phaseSequence[0]);
      amplifierA.setInput(0);
      amplifierA.runProgram();
      await this.runDownEventLoop();

      const amplifierB = new IntCodeComputer([...this.integers]);
      amplifierB.setInput(phaseSequence[1]);
      amplifierB.setInput(amplifierA.getLastOutput());
      amplifierB.runProgram();
      await this.runDownEventLoop();

      const amplifierC = new IntCodeComputer([...this.integers]);
      amplifierC.setInput(phaseSequence[2]);
      amplifierC.setInput(amplifierB.getLastOutput());
      amplifierC.runProgram();
      await this.runDownEventLoop();

      const amplifierD = new IntCodeComputer([...this.integers]);
      amplifierD.setInput(phaseSequence[3]);
      amplifierD.setInput(amplifierC.getLastOutput());
      amplifierD.runProgram();
      await this.runDownEventLoop();

      const amplifierE = new IntCodeComputer([...this.integers]);
      amplifierE.setInput(phaseSequence[4]);
      amplifierE.setInput(amplifierD.getLastOutput());
      amplifierE.runProgram();
      await this.runDownEventLoop();

      const output = amplifierE.getLastOutput();

      console.log('Output:', output);
      console.log();

      maxOutput = Math.max(maxOutput, output);
    }

    return maxOutput;
  }

  public async part2() {
    let maxOutput = Number.MIN_SAFE_INTEGER;

    const permutations = this.getPermutations([5, 6, 7, 8, 9]);

    for (const phaseSequence of permutations) {
      console.log('Attempting phase sequence:', phaseSequence);

      const amplifierA = new IntCodeComputer([...this.integers]);
      amplifierA.setInput(phaseSequence[0]);
      amplifierA.runProgram();

      const amplifierB = new IntCodeComputer([...this.integers]);
      amplifierB.setInput(phaseSequence[1]);
      amplifierB.runProgram();

      const amplifierC = new IntCodeComputer([...this.integers]);
      amplifierC.setInput(phaseSequence[2]);
      amplifierC.runProgram();

      const amplifierD = new IntCodeComputer([...this.integers]);
      amplifierD.setInput(phaseSequence[3]);
      amplifierD.runProgram();

      const amplifierE = new IntCodeComputer([...this.integers]);
      amplifierE.setInput(phaseSequence[4]);
      amplifierE.runProgram();

      let startInput = 0;

      while (
        !amplifierA.isFinished() ||
        !amplifierB.isFinished() ||
        !amplifierC.isFinished() ||
        !amplifierD.isFinished() ||
        !amplifierE.isFinished()
      ) {
        amplifierA.setInput(startInput);
        await this.runDownEventLoop();

        amplifierB.setInput(amplifierA.getLastOutput());
        await this.runDownEventLoop();

        amplifierC.setInput(amplifierB.getLastOutput());
        await this.runDownEventLoop();

        amplifierD.setInput(amplifierC.getLastOutput());
        await this.runDownEventLoop();

        amplifierE.setInput(amplifierD.getLastOutput());
        await this.runDownEventLoop();

        startInput = amplifierE.getLastOutput();
      }

      const output = amplifierE.getLastOutput();

      console.log('Output:', output);
      console.log();

      maxOutput = Math.max(maxOutput, output);
    }

    return maxOutput;
  }
}

export default Solution;
