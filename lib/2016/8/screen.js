const _ = require('lodash');

module.exports = class Screen {
  constructor(cols, rows) {
    this.pixels = new Array();
    for (let i = 0; i < rows; i++) {
      this.pixels.push(new Array(cols));
    }
  }

  parseInstructions(instructions) {
    this.instructions = instructions.split('\n');
  }

  followInstructions() {
    Screen.clearScreen();

    for (const instruction of this.instructions) {

      if (/^rect/.test(instruction)) {
        this.fillRect(instruction);
      }

      if (/^rotate column/.test(instruction)) {
        this.rotateColumn(instruction);
      }

      if (/^rotate row/.test(instruction)) {
        this.rotateRow(instruction);
      }

      this.displayScreen();
    }
  }

  fillRect(instruction) {
    const matches = instruction.match(/^rect (\d+)x(\d+)/);
    const x = parseInt(matches[1], 10);
    const y = parseInt(matches[2], 10);

    for (let row = 0; row < y; row++) {
      for (let col = 0; col < x; col++) {
        this.pixels[row][col] = true;
      }
    }
  }

  rotateColumn(instruction) {
    let newPixels = _.cloneDeep(this.pixels);

    const matches = instruction.match(/^rotate column x=(\d+) by (\d+)/);
    const colIndex = parseInt(matches[1], 10);
    const offset = parseInt(matches[2], 10);

    for (let i = 0; i < this.pixels.length; i++) {
      let prevRowIndex = i - offset;
      if (prevRowIndex < 0) {
        prevRowIndex += this.pixels.length;
      }

      newPixels[i][colIndex] = this.pixels[prevRowIndex][colIndex];
    }

    this.pixels = newPixels;
  }

  rotateRow(instruction) {
    let newPixels = _.cloneDeep(this.pixels);

    const matches = instruction.match(/^rotate row y=(\d+) by (\d+)/);
    const rowIndex = parseInt(matches[1], 10);
    const offset = parseInt(matches[2], 10);

    const row = this.pixels[rowIndex];
    for (let i = 0; i < row.length; i++) {
      let prevColIndex = i - offset;
      if (prevColIndex < 0) {
        prevColIndex += row.length;
      }

      newPixels[rowIndex][i] = this.pixels[rowIndex][prevColIndex];
    }

    this.pixels = newPixels;
  }

  displayScreen() {
    process.stdout.cursorTo(0, 0);
    process.stdout.clearLine();

    for (const row of this.pixels) {
      let display = '';
      for (const col of row) {
        display += col === true ? '#' : ' ';
      }

      console.log(display);
    }
  }

  countLights() {
    let count = 0;

    for (const row of this.pixels) {
      let display = '';
      for (const col of row) {
        count += col === true ? 1 : 0;
      }
    }

    return count;
  }

  static clearScreen() {
    console.log('\x1Bc');
  }
}
