const _ = require('lodash');
const fs = require('fs');
const Decompresser = require('./decompresser');

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();

const decompresser = new Decompresser();
decompresser.parseFile(data);

module.exports = {
  1: () => {
    decompresser.decompressV1();
    return decompresser.getCharCount();
  },
  2: () => {
    return decompresser.getV2CharCount();
  }
}
