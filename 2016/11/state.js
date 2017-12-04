const _ = require('lodash');
const Elevator = require('./elevator');
const Floor = require('./floor');

module.exports = class State {
  constructor(elevatorFloor, floorContents) {
    this.elevator = new Elevator(elevatorFloor);
    this.floors = [
      new Floor(0),
      new Floor(1),
      new Floor(2),
      new Floor(3),
    ];

    for (let i = 0; i < floorContents.length; i++) {
      _.each(floorContents[i], (item) => {
        this.floors[i].addItem(item);
      });
    }
  }

  getElevator() {
    return this.elevator;
  }

  isValid() {
    let rval = true;

    _.some(this.floors, (floor) => {
      const contents = floor.getContents().join(' ');



      _.each (contents, (item) => {

      });
    });
  }

  serialize() {
    let rval = '';
    _.each(this.floors, (floor) => {
      rval += floor.serialize();
    });
    rval += this.elevator.serialize();

    return rval;
  }
}

