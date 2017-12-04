const _ = require('lodash');
const Disc = require('./disc');

module.exports = class Sculpture {
  constructor() {
    this.discs = [];
    this.currentTime = 0;
    this.blueprint;
  }

  parseBlueprint(blueprint) {
    this.blueprint = blueprint;
    this.reset();
  }

  reset() {
    this.currentTime = 0;
    this.discs = [];
    const lines = this.blueprint.split('\n');
    _.each(lines, (line) => {
      const matches = line.match(/^Disc #\d+ has (\d+) positions; at time=0, it is at position (\d+)\.$/);
      if (!matches) {
        throw `Couldn't parse line: ${line}`;
      }

      const positions = parseInt(matches[1], 10);
      const startPosition = parseInt(matches[2], 10);
      this.discs.push(new Disc(positions, startPosition));
    });
  }

  getDiscs() {
    return this.discs;
  }

  tickTo(time) {
    this.reset();
    this.currentTime = time;
    _.each(this.discs, (disc, i) => {
      const position = (time + i + 1 + disc.getStartPosition()) % disc.getPositions();
      disc.setCurrentPosition(position);
    });
  }
}
