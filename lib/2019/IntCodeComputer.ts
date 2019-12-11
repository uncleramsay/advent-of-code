import Instruction, { IOptions } from './Instruction';

class IntCodeComputer {
  public constructor(private memory: number[], private options?: IOptions) {
    this.setMemory(memory);
  }

  public setMemory(memory: number[]) {
    this.memory = memory;
  }

  public getMemoryValue(address: number): number {
    return this.memory[address];
  }

  public setMemoryValue(address: number, value: number): void {
    this.memory[address] = value;
  }

  public async runProgram(): Promise<void> {
    let instructionPointer = 0;
    const opcodeLength = 1;

    while (true) {
      const instruction = new Instruction(
        this.memory,
        instructionPointer,
        this.options,
      );

      const parameters = this.memory.slice(
        instructionPointer + opcodeLength,
        instructionPointer + opcodeLength + instruction.parameterLength(),
      );

      await instruction.execute(parameters);

      if (instruction.isProgramFinished()) {
        return Promise.resolve();
      }

      instructionPointer = instruction.getNextInstructionAddress(parameters);
    }
  }
}

export default IntCodeComputer;
