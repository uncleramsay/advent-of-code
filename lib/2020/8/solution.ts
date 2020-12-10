import { readFileSync } from 'fs';
import Console from './Console';

class Solution {
  private input: string;
  private instructions: string[];
  private console: Console;

  constructor() {
    this.input = readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
    this.processData();
  }

  private processData(): void {
    this.instructions = this.input.split('\n');
  }

  public async part1() {
    this.console = new Console(this.instructions);

    try {
      await this.console.run();
    } catch (accumulator) {
      return accumulator;
    }

    throw `Console finished successfully (unexpectedly!)`;
  }

  public async part2() {
    let lastTriedIndex = -1;
    this.console = new Console(this.instructions);

    while (lastTriedIndex < this.instructions.length) {
      const newInstructions = [...this.instructions];
      for (let i = lastTriedIndex + 1; i < newInstructions.length; i++) {
        if (newInstructions[i].includes('jmp')) {
          newInstructions[i] = newInstructions[i].replace('jmp', 'nop');
          lastTriedIndex = i;
          break;
        }
        if (newInstructions[i].includes('nop')) {
          newInstructions[i] = newInstructions[i].replace('nop', 'jmp');
          lastTriedIndex = i;
          break;
        }
      }

      this.console.setInstructions(newInstructions);

      try {
        const accumulator = await this.console.run();
        return accumulator;
      } catch (acc) {}
    }

    throw `Console never completed`;
  }
}

export default Solution;
