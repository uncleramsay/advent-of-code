const join = require('path').join;

if (process.argv.length < 5) {
  console.log('Usage: node . <year> <day> <part>');
  process.exit();
}

const year = process.argv[2];
const day = process.argv[3];
const part = process.argv[4];

const solutions = require(join(__dirname, `../lib/${year}/${day}/solutions`));
const solution = solutions[part]();

console.log(`${year}-${day}-${part}: ${solution}`);
