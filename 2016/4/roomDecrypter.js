const _ = require('lodash');
const Room = require('./room');

module.exports = class RoomDecrypter {
  constructor() {
    this.rooms = [];
  }

  parseNames(names) {
    names = names.split('\n');
    _.each(names, (name) => {
      this.rooms.push(new Room(name));
    });
  }

  getRooms() {
    return this.rooms;
  }

  getValidRooms() {
    let validRooms = [];

    _.each(this.rooms, (room) => {
      if (room.isValid()) {
        validRooms.push(room);
      }
    });

    return validRooms;
  }

  getValidRoomsSectorIdSum() {
    let sum = 0;

    const validRooms = this.getValidRooms();
    _.each(validRooms, (room) => {
      sum += room.getSectorId();
    });

    return sum;
  }
}
