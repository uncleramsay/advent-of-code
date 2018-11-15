const _ = require('lodash');
const fs = require('fs');
const DataFiller = require('./dataFiller');

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();

module.exports = {
  1: () => {
    const dataFiller = new DataFiller(272);
    dataFiller.fillDisk(data);
    return dataFiller.getChecksum();
  },
  2: () => {
    const dataFiller = new DataFiller(35651584);
    dataFiller.fillDisk(data);
    return dataFiller.getChecksum();
  }
}
