const md5 = require('md5');
const randomstring = require('randomstring');

module.exports = class HashFinder {
  constructor() {
  }

  parseInput(id) {
    this.id = id;
  }

  findPassword() {
    let password = '';
    let counter = 0;

    while(password.length < 8) {

      // Progress updater
      if (counter % 100000 === 0) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(`Testing integer ${counter}`);
      }

      const hash = md5(this.id + counter);

      const matches = hash.match(/^00000(\w)/);
      if (matches && matches[1]) {
        password += matches[1];

        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        console.log(password);
      }

      counter += 1;
    }

    return password;
  }

  findHarderPassword() {
    let password = [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ];
    let counter = 0;

    while(password.indexOf(undefined) !== -1) {

      // Progress updater
      if (counter % 1000 === 0) {
        let display = '';
        for(let i = 0; i < 8; i++) {
          display += password[i] || randomstring.generate(1);
        }

        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(display);
      }

      const hash = md5(this.id + counter);

      const matches = hash.match(/^00000(\d)(\w)/);
      if (matches && matches[1] && matches[2]) {
        const position = parseInt(matches[1], 10);
        if (position < 8 && !password[position]) {
          password[position] = matches[2];
        }
      }

      counter += 1;
    }

    return password.join('');
  }
}
