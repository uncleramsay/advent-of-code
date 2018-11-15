const fs = require('fs');
const HashFinder = require('./hashFinder');

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();

const hashFinder = new HashFinder();
hashFinder.parseInput(data);

module.exports = {
  1: () => {
    return hashFinder.findPassword();
  },
  2: () => {
    return hashFinder.findHarderPassword();
  }
}
