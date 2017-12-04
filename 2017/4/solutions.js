const _ = require('lodash');
const fs = require('fs');
const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
const lines = data.split('\n');

module.exports = {
  1: () => {
    return countValidPassphrases();
  },
  2: () => {
    return countMoreSecureValidPassphrases();
  }
}

function countValidPassphrases() {
  let validPassphraseCount = 0;

  lines.forEach((line) => {
    const words = line.split(/\s/);
    if (words.length === _.uniq(words).length) {
      validPassphraseCount += 1;
    }
  });

  return validPassphraseCount;
}

function countMoreSecureValidPassphrases() {
  let validPassphraseCount = 0;

  lines.forEach((line) => {
    const sortedWords = [];
    const words = line.split(/\s/);

    words.forEach((word) => {
      const chars = word.split('');
      sortedWords.push(chars.sort((a,b) => a > b).join(''));
    });

    if (sortedWords.length === _.uniq(sortedWords).length) {
      validPassphraseCount += 1;
    }
  });

  return validPassphraseCount;
}
