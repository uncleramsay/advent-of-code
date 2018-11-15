const fs = require('fs');
const KeypadPresser = require('./keypadPresser');

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();

module.exports = {
  1: () => {

    const keys = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    const currentKeyIndex = {
      row: 1,
      col: 1,
    };

    const keypadPresser = new KeypadPresser(keys, currentKeyIndex);
    keypadPresser.parseInstructions(data);
    keypadPresser.followInstructions();
    return keypadPresser.getKeysPressed();
  },
  2: () => {

    const keys = [
      [null, null, 1, null, null],
      [null, 2, 3, 4, null],
      [5, 6, 7, 8, 9],
      [null, 'A', 'B', 'C', null],
      [null, null, 'D', null, null],
    ];

    const currentKeyIndex = {
      row: 2,
      col: 0,
    };

    const keypadPresser = new KeypadPresser(keys, currentKeyIndex);
    keypadPresser.parseInstructions(data);
    keypadPresser.followInstructions();
    return keypadPresser.getKeysPressed();
  }
}
