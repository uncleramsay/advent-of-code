const _ = require('lodash');
const fs = require('fs');
const MapMaker = require('./mapMaker');

// const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
const favouriteNumber = 1352;

const mapMaker = new MapMaker(favouriteNumber);

module.exports = {
  1: () => {
    mapMaker.printMap(33,41);
    return '';
  },
  2: () => {
  }
}
