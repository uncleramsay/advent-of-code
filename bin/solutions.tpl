const fs = require('fs');
const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();

module.exports = {
  1: () => {
    return undefined;
  },
  2: () => {
    return undefined;
  }
}
