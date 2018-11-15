const _ = require('lodash');
const Disc = require('./disc');

module.exports = class Timer {
  constructor(sculpture) {
    this.sculpture = sculpture;
  }

  findFirstStartTime() {
    let solution = -1;

    let startTime = 0;
    while (solution < 0) {
      if (startTime % 10000 === 0) {
        console.log(`Trying start time ${startTime}`);
      }
      this.sculpture.reset();

      this.sculpture.tickTo(startTime);
      const discs = this.sculpture.getDiscs();

      for (let i = 0; i < discs.length; i++) {
        if (discs[i].getCurrentPosition() !== 0) {
          break;
        }

        if (i === discs.length - 1) {
          solution = startTime;
        }
      }

      startTime += 1;
    }

    return solution;
  }
}
