class IntCodeComputer {
  private debugMode: boolean;
  private memory: number[];

  public constructor(integers: number[], options?: { debugMode: boolean }) {
    this.debugMode = !!options?.debugMode;
    this.setMemory(integers);
  }

  public setMemory(integers: number[]) {
    this.memory = integers;
  }

  public getInteger(address: number): number {
    return this.memory[address];
  }

  public setInteger(address: number, value: number): void {
    this.memory[address] = value;
  }

  public runProgram(): void {
    let instructionPointer = 0;
    let opcodeLength = 0;
    let parametersLength = 0;

    while (true) {
      const opcode = this.memory[instructionPointer];

      switch (opcode) {
        case 99: {
          opcodeLength = 1;
          parametersLength = 0;
          return;
        }

        case 1: {
          opcodeLength = 1;
          parametersLength = 3;
          this.performAddition(instructionPointer);
          break;
        }
        case 2: {
          opcodeLength = 1;
          parametersLength = 3;
          this.performMultiplication(instructionPointer);
        }
      }

      instructionPointer += opcodeLength + parametersLength;
    }
  }

  private performAddition(instructionAddress: number): void {
    this.performAction(
      instructionAddress,
      (left: number, right: number, resultAddress: number) => {
        if (this.debugMode) {
          console.log(
            `adding ${left} and ${right}, and storing at address ${resultAddress}`,
          );
        }

        this.memory[resultAddress] = left + right;
      },
    );
  }

  private performMultiplication(instructionAddress: number): void {
    this.performAction(
      instructionAddress,
      (left: number, right: number, resultAddress: number) => {
        if (this.debugMode) {
          console.log(
            `multiplying ${left} and ${right}, and storing at address ${resultAddress}`,
          );
        }

        this.memory[resultAddress] = left * right;
      },
    );
  }

  private performAction(
    instructionAddress: number,
    callback: (left: number, right: number, resultAddress: number) => void,
  ): void {
    const leftAddress = this.memory[instructionAddress + 1];
    const rightAddress = this.memory[instructionAddress + 2];
    const resultAddress = this.memory[instructionAddress + 3];

    callback(
      this.memory[leftAddress],
      this.memory[rightAddress],
      resultAddress,
    );
  }
}

export default IntCodeComputer;
