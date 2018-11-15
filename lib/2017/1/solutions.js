const fs = require('fs');
const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
const chars = data.split('');

module.exports = {
  1: () => {
    return calculateInverseCaptcha(chars, 1);
  },
  2: () => {
    return calculateInverseCaptcha(chars, chars.length / 2);
  }
}

function calculateInverseCaptcha(chars, jump) {
  let sum = 0;

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const nextChar = ((i + jump) > (chars.length - 1)) ? chars[(i+jump)-chars.length] : chars[i+jump];

    if (char === nextChar) {
      sum += parseInt(char, 10);
    }
  }

  return sum;
}
