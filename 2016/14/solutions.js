const _ = require('lodash');
const fs = require('fs');
const KeyFinder = require('./keyFinder');

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();

const keyFinder = new KeyFinder(data);

module.exports = {
  1: () => {
    return keyFinder.findLastKey(64, false);
  },
  2: () => {
    return keyFinder.findLastKey(64, true);
  }
}
