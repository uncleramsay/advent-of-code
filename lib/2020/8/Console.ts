export default class Console {
  private accumulator: number;
  private instructionHistory: boolean[];
  private instructionIndex: number;

  constructor(private instructions: string[]) {
    this.resetConsole();
  }

  public setInstructions(instructions: string[]) {
    this.instructions = instructions;
    this.resetConsole();
  }

  public async run(): Promise<number> {
    return new Promise((resolve, reject) => {
      while (this.instructionHistory[this.instructionIndex] !== true) {
        if (this.instructionIndex >= this.instructions.length) {
          // Instructions are complete
          resolve(this.accumulator);
          return;
        }

        this.runInstruction();
      }

      // Console is in an infinite loop
      reject(this.accumulator);
      return;
    });
  }

  private resetConsole(): void {
    this.accumulator = 0;
    this.instructionHistory = [];
    this.instructionIndex = 0;
  }

  private runInstruction(): void {
    const instruction = this.instructions[this.instructionIndex];
    const matches = instruction.match(/^(\S+)\s([+-]\d+)/);
    if (!matches) {
      throw `Did not understand instruction ${instruction}`;
    }

    const [, operation, argument] = matches;
    this.instructionHistory[this.instructionIndex] = true;

    switch (operation) {
      case 'nop': {
        this.instructionIndex += 1;
        break;
      }

      case 'acc': {
        this.accumulator += parseInt(argument, 10);
        this.instructionIndex += 1;
        break;
      }

      case 'jmp': {
        this.instructionIndex += parseInt(argument, 10);
        break;
      }

      default: {
        throw `Didn't understand operation ${operation}`;
      }
    }
  }
}
