const _ = require('lodash');

module.exports = class PasswordCracker {
  constructor(registers) {
    this.registers = registers;
  }

  parseInstructions(file) {
    const instructions = file.split('\n');

    PasswordCracker.clearScreen();

    let count = 0;
    for (let i = 0; i < instructions.length; i++) {
      const instruction = instructions[i];

      const matches = instruction.match(/^(\w+) (\w+) ?(-?\w+)?$/);
      if (!matches) {
        throw `Couldn't understand instruction: ${instruction}`;
      }

      let register, value, skip;
      switch(matches[1]) {
        case 'cpy':
          register = matches[3];
          value = this.resolveInput(matches[2]);
          // console.log(`cpy: Setting register ${register} to ${value}`);
          this.registers[register] = value;
          break;

        case 'inc':
          register = matches[2];
          value = this.registers[register] + 1;
          // console.log(`inc: Setting register ${register} to ${value}`);
          this.registers[register] = value;
          break;

        case 'dec':
          register = matches[2];
          value = this.registers[register] - 1;
          // console.log(`inc: Setting register ${register} to ${value}`);
          this.registers[register] = value;
          break;

        case 'jnz':
          value = this.resolveInput(matches[2]);
          skip = parseInt(matches[3], 10) - 1;
          if (value !== 0) {
            // console.log(`jnz: Skipping ${skip} instructions`);
            i += skip;
          }
          break;
      }

      count += 1;
      if (count % 1000 === 0) {
        this.printStatus(count);
      }
    }

    this.printStatus(count);
  }

  resolveInput(input) {
    if (/^[a-d]$/.test(input)) {
      return this.registers[input];
    }

    return parseInt(input, 10);
  }

  printStatus(count) {
    process.stdout.cursorTo(0, 0);
    process.stdout.clearLine();

    console.log(`After ${count} instructions:`);
    console.log(`a: ${this.registers.a}`);
    console.log(`b: ${this.registers.b}`);
    console.log(`c: ${this.registers.c}`);
    console.log(`d: ${this.registers.d}`);
  }

  getRegisters() {
    return this.registers;
  }

  printRegisters() {
    console.log(this.registers);
  }

  static clearScreen() {
    console.log('\x1Bc');
  }
}
