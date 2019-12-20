import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

if (process.argv.length < 4) {
  console.log('Usage: node scaffold <year> <day>');
  process.exit();
}

const year = process.argv[2];
const day = process.argv[3];

const path = join(__dirname, `../lib/${year}/${day}`);

mkdirSync(path, { recursive: true });

writeFileSync(
  `${path}/solution.ts`,
  readFileSync(join(__dirname, 'solution.tpl')),
);

writeFileSync(
  `${path}/solution.spec.ts`,
  readFileSync(join(__dirname, 'solution.spec.tpl'), { encoding: 'utf8' })
    .replace('$$YEAR$$', year)
    .replace('$$DAY$$', day),
);

writeFileSync(`${path}/data.txt`, '');
