import { createInterface } from 'readline';

export interface IOptions {
  debugMode: boolean;
}

class Instruction {
  private opcode: number;
  private parameterModes: number[];

  public constructor(
    private memory: number[],
    private instructionPointer: number,
    private options?: IOptions,
  ) {
    const value = this.memory[this.instructionPointer];
    const stringVal = `${value}`;

    this.opcode = parseInt(stringVal.substr(-2), 10);

    const parameterModesString = stringVal.substr(0, stringVal.length - 2);
    this.parameterModes = parameterModesString
      .split('')
      .reverse()
      .map((char: string) => parseInt(char, 10));

    this.prepareParameterModes();
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
      case 4: {
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

  public execute(parameters: number[]): Promise<void> {
    return new Promise((resolve, reject) => {
      if (parameters.length !== this.parameterModes.length) {
        reject("Don't have assigned modes for all parameters");
      }

      switch (this.opcode) {
        case 1: {
          const [leftAddress, rightAddress, resultAddress] = parameters;
          const [leftMode, rightMode] = this.parameterModes;

          const left = this.getParamValue(leftAddress, leftMode);
          const right = this.getParamValue(rightAddress, rightMode);

          this.debugLog(
            `opcode 1: ${left} + ${right} stored in ${resultAddress}`,
          );
          this.memory[resultAddress] = left + right;

          resolve();
          break;
        }

        case 2: {
          const [leftAddress, rightAddress, resultAddress] = parameters;
          const [leftMode, rightMode] = this.parameterModes;

          const left = this.getParamValue(leftAddress, leftMode);
          const right = this.getParamValue(rightAddress, rightMode);

          this.debugLog(
            `opcode 2: ${left} * ${right} stored in ${resultAddress}`,
          );
          this.memory[resultAddress] = left * right;

          resolve();
          break;
        }

        case 3: {
          const readInterface = createInterface({
            input: process.stdin,
            output: process.stdout,
          });

          readInterface.question('Please provide input: ', (input: string) => {
            if (!input) {
              reject('opcode 3 requires input');
            }

            const [resultAddress] = parameters;

            this.debugLog(`opcode 3: ${input} stored in ${resultAddress}`);
            this.memory[resultAddress] = parseInt(input, 10);

            readInterface.close();
            resolve();
          });

          break;
        }

        case 4: {
          const [resultAddress] = parameters;
          const [resultMode] = this.parameterModes;
          this.debugLog(`opcode 4: sending output.`);
          this.logOutput(`${this.getParamValue(resultAddress, resultMode)}`);

          resolve();
          break;
        }

        case 5:
        case 6: {
          // These cases only affect the instruction pointer
          this.debugLog(`opcode 5/6: skip`);
          resolve();
          break;
        }

        case 7: {
          const [leftAddress, rightAddress, resultAddress] = parameters;
          const [leftMode, rightMode] = this.parameterModes;

          const left = this.getParamValue(leftAddress, leftMode);
          const right = this.getParamValue(rightAddress, rightMode);

          this.debugLog(
            `opcode 7: ${left} < ${right} ? ${
              left < right ? 1 : 0
            } stored in ${resultAddress}`,
          );
          this.memory[resultAddress] = left < right ? 1 : 0;

          resolve();
          break;
        }

        case 8: {
          const [leftAddress, rightAddress, resultAddress] = parameters;
          const [leftMode, rightMode] = this.parameterModes;

          const left = this.getParamValue(leftAddress, leftMode);
          const right = this.getParamValue(rightAddress, rightMode);

          this.debugLog(
            `opcode 7: ${left} === ${right} ? ${
              left === right ? 1 : 0
            } stored in ${resultAddress}`,
          );
          this.memory[resultAddress] = left === right ? 1 : 0;

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

      if (test !== 0) {
        this.debugLog(`opcode 5: setting instruction pointer to ${test}`);
        return this.getParamValue(resultAddress, resultMode);
      }
    } else if (this.opcode === 6) {
      const [testAddress, resultAddress] = parameters;
      const [testMode, resultMode] = this.parameterModes;

      const test = this.getParamValue(testAddress, testMode);

      if (test === 0) {
        this.debugLog(`opcode 6: setting instruction pointer to ${test}`);
        return this.getParamValue(resultAddress, resultMode);
      }
    }

    const opcodeLength = 1;
    const address =
      this.instructionPointer + opcodeLength + this.parameterLength();

    this.debugLog(`setting instruction pointer to ${address}`);
    return address;
  }

  public isProgramFinished(): boolean {
    return this.opcode === 99;
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

  private getParamValue(param: number, mode: number): number {
    if (mode === 1) {
      return param;
    }

    return this.memory[param];
  }

  private logOutput(output: string) {
    console.log('== OUTPUT ==');
    console.log(output);
    console.log('============');
    console.log();
  }

  private debugLog(output: string) {
    if (!this.options?.debugMode) {
      return;
    }

    console.log(output);
  }
}

export default Instruction;
