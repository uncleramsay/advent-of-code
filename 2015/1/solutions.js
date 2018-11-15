const fs = require('fs');
const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();

function analyse() {
  const rval = {
    basementEntry: undefined,
    down: 0,
    up: 0
  };

  for (let i = 0; i < data.length; i++) {
    if (data[i] === '(') {
      rval.up += 1;
    } else if (data[i] === ')') {
      rval.down += 1;
    }

    if (rval.basementEntry === undefined && rval.up - rval.down < 0) {
      rval.basementEntry = i + 1;
    }
  }

  return rval;
}

module.exports = {
  1: () => {
    const results = analyse();
    return results.up - results.down;
  },
  2: () => {
    return analyse().basementEntry;
  }
};
