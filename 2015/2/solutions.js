const fs = require('fs');
const tail = require('lodash').tail;
const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();

function analyse() {
  const rval = {
    paper: 0,
    ribbon: 0,
  };

  const lines = data.split('\n');
  lines.forEach(line => {
    const matches = line.match(/^(\d+)x(\d+)x(\d+)$/);
    if (!matches[0]) {
      console.error(`Couldn't parse line: ${line}`);
    }

    const sides = tail(matches)
      .map(side => parseInt(side, 10))
      .sort((a, b) => a - b);

    const [l, w, h] = sides; // Order doesn't make any difference

    const surface = 2 * l * w + 2 * w * h + 2 * h * l;
    const slack = l * w; // Sorted, so guaranteed to be smallest side

    const ribbon = 2 * l + 2 * w;
    const bow = l * w * h;

    rval.paper += surface + slack;
    rval.ribbon += ribbon + bow;
  });

  return rval;
}

module.exports = {
  1: () => {
    return analyse().paper;
  },
  2: () => {
    return analyse().ribbon;
  },
};
