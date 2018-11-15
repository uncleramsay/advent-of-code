const fs = require('fs');
const MapReader = require('./mapReader');

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
const mapReader = new MapReader();

mapReader.parseInstructions(data);

module.exports = {
  1: () => {
    mapReader.followInstructions();
    return mapReader.getDistanceFromStart();
  },
  2: () => {
    mapReader.followInstructionsUntilPathsCross();
    return mapReader.getDistanceFromStart();
  }
}
