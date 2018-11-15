const _ = require('lodash');
const fs = require('fs');
const PasswordCracker = require('./passwordCracker');

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();

module.exports = {
  1: () => {
    const passwordCracker = new PasswordCracker({
      a: 0,
      b: 0,
      c: 0,
      d: 0,
    });
    passwordCracker.parseInstructions(data);
    return passwordCracker.getRegisters()['a'];
  },
  2: () => {
    const passwordCracker = new PasswordCracker({
      a: 0,
      b: 0,
      c: 1,
      d: 0,
    });
    passwordCracker.parseInstructions(data);
    return passwordCracker.getRegisters()['a'];
  }
}
