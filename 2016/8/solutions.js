const _ = require('lodash');
const fs = require('fs');
const Screen = require('./screen');

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();

const screen = new Screen(50, 6);
screen.parseInstructions(data);
screen.followInstructions();

module.exports = {
  1: () => {
    return screen.countLights();
  },
  2: () => {
    screen.displayScreen();
    return '';
  }
}
