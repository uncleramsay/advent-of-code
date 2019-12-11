import { join } from 'path';

(async function() {
  if (process.argv.length < 5) {
    console.log('Usage: node . <year> <day> <part>');
    process.exit();
  }

  const year = process.argv[2];
  const day = process.argv[3];
  const part = process.argv[4];

  const Solution = (
    await import(join(__dirname, `../lib/${year}/${day}/solution`))
  ).default;

  const solution = new Solution();
  const result = await Promise.resolve(solution[`part${part}`]());

  console.log('');
  console.log(`==== ${year} Day ${day} Part ${part} Solution ====`);
  console.log(result);
  console.log('');
})();
