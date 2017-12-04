const _ = require('lodash');

module.exports = class KeypadPresser {
  constructor(keys, currentKeyIndex) {
    this.keys = keys;

    this.currentKeyIndex = currentKeyIndex;
    this.keysPressed = [];
  }

  getKeysPressed() {
    return this.keysPressed;
  }

  parseInstructions(instructions) {
    this.instructions = instructions.split('\n');
  }

  followInstructions() {
    _.each(this.instructions, (instruction) => {
      for (let i = 0; i < instruction.length; i++) {
        switch (instruction[i]) {
          case 'U':
            if (this._checkKeyIndex(this.currentKeyIndex.row - 1, this.currentKeyIndex.col)) {
              this.currentKeyIndex.row -= 1;
            }
            break;

          case 'R':
            if (this._checkKeyIndex(this.currentKeyIndex.row, this.currentKeyIndex.col + 1)) {
              this.currentKeyIndex.col += 1;
            }
            break;

          case 'D':
            if (this._checkKeyIndex(this.currentKeyIndex.row + 1, this.currentKeyIndex.col)) {
              this.currentKeyIndex.row += 1;
            }
            break;

          case 'L':
            if (this._checkKeyIndex(this.currentKeyIndex.row, this.currentKeyIndex.col - 1)) {
              this.currentKeyIndex.col -= 1;
            }
            break;
        }
      }

      const keyPressed = this.keys[this.currentKeyIndex.row][this.currentKeyIndex.col];
      this.keysPressed.push(keyPressed);
    });
  }

  _checkKeyIndex(rowIndex, colIndex) {
    if (rowIndex < 0 || colIndex < 0) {
      return false;
    }

    if (rowIndex > this.keys.length - 1) {
      return false;
    }

    if (colIndex > this.keys[rowIndex].length - 1) {
      return false;
    }

    if (this.keys[rowIndex][colIndex] === null) {
      return false;
    }

    return true;
  }
}
