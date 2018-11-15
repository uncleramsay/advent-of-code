const _ = require('lodash');
const State = require('./state');

module.exports = class Controller {
  constructor() {
    this.currentState;
    this.visitedStates = new Set();
  }

  parseLocations(file) {
    let floorContents = [
      [],
      [],
      [],
      [],
    ];

    const locations = file.split('\n');
    _.each(locations, (location) => {
      let matches = location.match(/^The (\w+) floor contains/);
      if (!matches || !matches[1]) {
        throw `Couldn't parse location: ${location}`;
      }

      const floor = Controller._parseInstructionFloor(matches[1]) - 1;
      let regexMatches = [];

      const generatorRegex = /a (\w+) generator/g;
      matches = [];
      while(regexMatches = generatorRegex.exec(location)) {
        matches.push(regexMatches[1]);
      }
      if (matches) {
        for (let i = 0; i < matches.length; i++) {
          floorContents[floor].push(`${matches[i]} generator`);
        }
      }

      const microchipRegex = /a (\w+)-compatible microchip/g;
      matches = [];
      while(regexMatches = microchipRegex.exec(location)) {
        matches.push(regexMatches[1]);
      }
      if (matches) {
        for (let i = 0; i < matches.length; i++) {
          floorContents[floor].push(`${matches[i]} microchip`);
        }
      }
    });

    this.currentState = new State(0, floorContents);
    console.log(this.currentState.serialize());
  }

  // findRoute() {
  //   let finalRoute = [];

  //   this.visitedStates.push(this.serialize());

  //   // Compute possible iterations
  //   while (finalRoute.length === 0) {
  //     const elevatorFloor = this.elevator.getFloor();



  //     if (this.elevator.getFloor() === 0) {

  //     }
  //   }
  // }

  static _parseInstructionFloor(floor) {
    switch (floor) {
      case 'first':
        return 1;

      case 'second':
        return 2;

      case 'third':
        return 3;

      case 'fourth':
        return 4;
    }

    throw `Couldn't understand floor ${floor}`;
  }
}

