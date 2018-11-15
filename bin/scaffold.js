const fs = require('fs');
const join = require('path').join;

if (process.argv.length < 4) {
  console.log('Usage: node scaffold <year> <day>');
  process.exit();
}

const year = process.argv[2];
const day = process.argv[3];

const path = join(__dirname, `../lib/${year}/${day}`);

fs.mkdirSync(path, { recursive: true });

fs.writeFileSync(
  `${path}/solutions.js`,
  fs.readFileSync(join(__dirname, 'solutions.tpl')),
);

fs.writeFileSync(`${path}/data.txt`, '');
