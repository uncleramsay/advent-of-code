export interface IOptions {
  debugMode: boolean;
}

class Instruction {
  private opcode: number;
  private parameterModes: number[];

  public constructor(
    private memory: number[],
    private instructionPointer: number,
    private inputGetter: () => Promise<number>,
    private relativeBase: number,
    private options?: IOptions,
  ) {
    const value = this.getParamValue(this.instructionPointer, 0);
    const stringVal = `${value}`;

    this.opcode = parseInt(stringVal.substr(-2), 10);

    const parameterModesString = stringVal.substr(0, stringVal.length - 2);
    this.parameterModes = parameterModesString
      .split('')
      .reverse()
      .map((char: string) => parseInt(char, 10));

    this.prepareParameterModes();
  }

  private prepareParameterModes(): void {
    if (this.parameterModes.length === this.parameterLength()) {
      return;
    }

    const numMissingModes = this.parameterLength() - this.parameterModes.length;

    for (let i = 0; i < numMissingModes; i++) {
      this.parameterModes.push(0);
    }
  }

  public parameterLength(): number {
    switch (this.opcode) {
      case 1:
      case 2:
      case 7:
      case 8: {
        return 3;
      }

      case 3:
      case 4:
      case 9: {
        return 1;
      }

      case 5:
      case 6: {
        return 2;
      }

      case 99: {
        return 0;
      }

      default: {
        throw "Didn't understand opcode " + this.opcode;
      }
    }
  }

  public async execute(parameters: number[]): Promise<void | number> {
    return new Promise(async (resolve, reject) => {
      if (parameters.length !== this.parameterModes.length) {
        reject("Don't have assigned modes for all parameters");
      }

      switch (this.opcode) {
        case 1: {
          const [leftAddress, rightAddress, resultAddress] = parameters;
          const [leftMode, rightMode, resultMode] = this.parameterModes;

          const left = this.getParamValue(leftAddress, leftMode);
          const right = this.getParamValue(rightAddress, rightMode);
          const result = left + right;

          this.debugLog(
            `opcode 1 addresses: ${leftAddress} + ${rightAddress} stored in ${resultAddress}`,
            `opcode 1 results: ${left} + ${right} = ${result}`,
            '',
          );

          this.setAddressValue(resultAddress, resultMode, result);

          resolve();
          break;
        }

        case 2: {
          const [leftAddress, rightAddress, resultAddress] = parameters;
          const [leftMode, rightMode, resultMode] = this.parameterModes;

          const left = this.getParamValue(leftAddress, leftMode);
          const right = this.getParamValue(rightAddress, rightMode);
          const result = left * right;

          this.debugLog(
            `opcode 2 addresses: ${leftAddress} * ${rightAddress} stored in ${resultAddress}`,
            `opcode 2 results: ${left} * ${right} = ${result}`,
            '',
          );

          this.setAddressValue(resultAddress, resultMode, result);

          resolve();
          break;
        }

        case 3: {
          let [resultAddress] = parameters;
          const [resultMode] = this.parameterModes;

          this.debugLog(`opcode 3: awaiting input`);
          const input = await this.inputGetter();

          this.debugLog(
            `opcode 3: input found: ${input}`,
            `opcode 3 results: ${input} stored in ${resultAddress}`,
            '',
          );

          this.setAddressValue(resultAddress, resultMode, input);

          resolve();
          break;
        }

        case 4: {
          const [resultAddress] = parameters;
          const [resultMode] = this.parameterModes;
          const output = this.getParamValue(resultAddress, resultMode);

          this.debugLog(
            `opcode 4 addresses: getting value from ${resultAddress}`,
            `opcode 4 results: outputting ${output}`,
            '',
          );

          resolve(output);
          break;
        }

        case 5:
        case 6: {
          // These cases only affect the instruction pointer
          this.debugLog(`opcode 5/6: skip execution`, '');
          resolve();
          break;
        }

        case 7: {
          const [leftAddress, rightAddress, resultAddress] = parameters;
          const [leftMode, rightMode, resultMode] = this.parameterModes;

          const left = this.getParamValue(leftAddress, leftMode);
          const right = this.getParamValue(rightAddress, rightMode);
          const result = left < right ? 1 : 0;

          this.debugLog(
            `opcode 7 addresses: ${leftAddress} < ${rightAddress} ? 1 : 0 stored in ${resultAddress}`,
            `opcode 7 results: ${left} < ${right} = ${result}`,
            '',
          );

          this.setAddressValue(resultAddress, resultMode, result);

          resolve();
          break;
        }

        case 8: {
          const [leftAddress, rightAddress, resultAddress] = parameters;
          const [leftMode, rightMode, resultMode] = this.parameterModes;

          const left = this.getParamValue(leftAddress, leftMode);
          const right = this.getParamValue(rightAddress, rightMode);
          const result = left === right ? 1 : 0;

          this.debugLog(
            `opcode 8 addresses: ${leftAddress} === ${rightAddress} ? 1 : 0 stored in ${resultAddress}`,
            `opcode 8 results: ${left} === ${right} = ${result}`,
            '',
          );

          this.setAddressValue(resultAddress, resultMode, result);

          resolve();
          break;
        }

        case 9: {
          const [address] = parameters;
          const [mode] = this.parameterModes;

          const value = this.getParamValue(address, mode);

          this.debugLog(
            `opcode 9 address: ${address}`,
            `opcode 9 results: ${value}`,
            '',
          );

          this.relativeBase += value;
          resolve();
          break;
        }

        case 99: {
          this.debugLog(`opcode 99: done`);
          resolve();
          return;
        }

        default: {
          reject("Didn't understand opcode " + this.opcode);
        }
      }
    });
  }

  public getNextInstructionAddress(parameters: number[]): number {
    if (parameters.length !== this.parameterModes.length) {
      throw "Don't have assigned modes for all parameters";
    }

    if (this.opcode === 5) {
      const [testAddress, resultAddress] = parameters;
      const [testMode, resultMode] = this.parameterModes;
      const test = this.getParamValue(testAddress, testMode);
      const result = this.getParamValue(resultAddress, resultMode);

      this.debugLog(`opcode 5 addresses: check ${resultAddress} === 0`);

      if (test !== 0) {
        this.debugLog(
          `opcode 5 results: ${test} !== 0; setting instruction pointer to ${result}`,
          '',
        );
        return result;
      } else {
        this.debugLog(`opcode 5 results: ${test} === 0; doing nothing`);
      }
    } else if (this.opcode === 6) {
      const [testAddress, resultAddress] = parameters;
      const [testMode, resultMode] = this.parameterModes;
      const test = this.getParamValue(testAddress, testMode);
      const result = this.getParamValue(resultAddress, resultMode);

      this.debugLog(`opcode 6 addresses: check ${resultAddress} === 0`);

      if (test === 0) {
        this.debugLog(
          `opcode 6 results: ${test} === 0; setting instruction pointer to ${result}`,
          '',
        );
        return result;
      } else {
        this.debugLog(`opcode 6 results: ${test} !== 0; doing nothing`);
      }
    }

    const opcodeLength = 1;
    const address =
      this.instructionPointer + opcodeLength + this.parameterLength();

    this.debugLog(`setting instruction pointer to ${address}`, '');
    return address;
  }

  public getRelativeBase(): number {
    return this.relativeBase;
  }

  public isProgramFinished(): boolean {
    return this.opcode === 99;
  }

  private getParamValue(param: number, mode: number): number {
    let rval: number = 0;

    if (mode === 1) {
      rval = param;
    } else if (mode === 2) {
      rval = this.memory[param + this.relativeBase];
    } else {
      rval = this.memory[param];
    }

    return rval || 0;
  }

  private setAddressValue(address: number, mode: number, value: number): void {
    if (mode === 2) {
      address += this.relativeBase;
    }

    this.memory[address] = value;
  }

  private debugLog(output: string, ...additionalOutputs: string[]) {
    if (!this.options?.debugMode) {
      return;
    }

    for (const log of [output, ...additionalOutputs]) {
      console.log(log);
    }
  }
}

export default Instruction;
