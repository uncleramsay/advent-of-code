const day = process.argv[2];
const part = process.argv[3];

const solutions = require(`./${day}/solutions`);
const solution = solutions[part]();

console.log(`Day ${day} Part ${part}: ${solution}`);
