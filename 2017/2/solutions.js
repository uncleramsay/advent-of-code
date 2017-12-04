const fs = require('fs');
const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
const lines = data.split('\n');

module.exports = {
  1: () => {
    return calculateChecksum(lines);
  },
  2: () => {
    return calculateDivisibleValues(lines);
  }
}

function calculateChecksum(lines) {
  const diffs = [];

  lines.forEach((line) => {
    let max = 0;
    let min = Infinity;
    const nums = line.split(/\s/);
    nums.forEach((num) => {
      num = parseInt(num, 10);
      if (num > max) { max = num }
      if (num < min) { min = num }
    });

    diffs.push(max - min);
  });

  return diffs.reduce((sum, diff) => diff + sum, 0);
}

function calculateDivisibleValues(lines) {
  const results = [];

  for (let i = 0; i < lines.length; i++) {
    results.push(findDivisibleResult(lines[i]));
  }

  return results.reduce((sum, result) => result + sum, 0);
}

function findDivisibleResult(line) {
  const nums = line.split(/\s/);

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const left = parseInt(nums[i], 10);
      const right = parseInt(nums[j], 10);

      if ((left / right) % 1 === 0) {
        return left / right;
      }

      if ((right / left) % 1 === 0) {
        return right / left;
      }
    }
  }

  console.error(`Couldn't find divisible value for line: ${line}`);
}
