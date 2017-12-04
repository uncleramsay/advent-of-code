const _ = require('lodash');
const fs = require('fs');
const Sculpture = require('./sculpture');
const Timer = require('./timer');

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
const data2 = fs.readFileSync(`${__dirname}/data2.txt`, 'utf8').trim();

const sculpture = new Sculpture();
const timer = new Timer(sculpture);

module.exports = {
  1: () => {
    sculpture.parseBlueprint(data);
    return timer.findFirstStartTime();
  },
  2: () => {
    sculpture.parseBlueprint(data2);
    return timer.findFirstStartTime();
  }
}
