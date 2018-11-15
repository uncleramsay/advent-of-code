const _ = require('lodash');
const fs = require('fs');
const RoomDecrypter = require('./roomDecrypter');

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();

const roomDecrypter = new RoomDecrypter();
roomDecrypter.parseNames(data);

module.exports = {
  1: () => {
    return roomDecrypter.getValidRoomsSectorIdSum();
  },
  2: () => {
    let sectorId = 0;
    const validRooms = roomDecrypter.getValidRooms();
    _.each(validRooms, (room) => {
      if (room.getDecryptedName() === 'northpole object storage') {
        sectorId = room.getSectorId();
      }
    });

    return sectorId;
  }
}
