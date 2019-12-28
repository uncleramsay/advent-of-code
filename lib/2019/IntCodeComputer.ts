import Instruction, { IOptions } from './Instruction';

interface IInput {
  promise: Promise<number>;
  ready: boolean;
  resolver: (input: number) => void;
  used: boolean;
}

class IntCodeComputer {
  private inputs: IInput[];
  private output: number[] = [];
  private finished: boolean = false;
  private relativeBase: number = 0;

  public constructor(private memory: number[], private options?: IOptions) {
    this.setMemory(memory);
    this.inputs = [];
  }

  public setMemory(memory: number[]) {
    this.memory = memory;
  }

  public getMemoryValue(address: number): number {
    return this.memory[address] || 0;
  }

  public setMemoryValue(address: number, value: number): void {
    this.memory[address] = value;
  }

  public async getInput(): Promise<number> {
    for (const input of this.inputs) {
      if (!input.used) {
        input.used = true;
        return input.promise;
      }
    }

    // Input not found. Wait for one
    let resolver: (input: number) => void = () => {};
    const promise: Promise<number> = new Promise(resolve => {
      resolver = resolve;
    });
    this.inputs.push({
      promise,
      ready: false,
      resolver,
      used: true,
    });

    return promise;
  }

  public setInput(value: number) {
    for (const input of this.inputs) {
      if (!input.ready) {
        input.ready = true;
        input.resolver(value);
        return;
      }
    }

    // No pending inputs. Add one
    this.inputs.push({
      promise: Promise.resolve(value),
      ready: true,
      resolver: () => {},
      used: false,
    });
  }

  public getOutput(): number[] {
    return this.output;
  }

  public getLastOutput(): number {
    return this.output[this.output.length - 1];
  }

  public async runProgram(): Promise<void> {
    let instructionPointer = 0;
    const opcodeLength = 1;

    while (true) {
      const instruction = new Instruction(
        this.memory,
        instructionPointer,
        this.getInput.bind(this),
        this.relativeBase,
        this.options,
      );

      const parameters = this.memory.slice(
        instructionPointer + opcodeLength,
        instructionPointer + opcodeLength + instruction.parameterLength(),
      );

      const output = await instruction.execute(parameters);
      if (output !== undefined) {
        this.output.push(output);
      }

      if (instruction.isProgramFinished()) {
        this.finished = true;
        return Promise.resolve();
      }

      instructionPointer = instruction.getNextInstructionAddress(parameters);
      this.relativeBase = instruction.getRelativeBase();
    }
  }

  public isFinished(): boolean {
    return this.finished;
  }
}

export default IntCodeComputer;
