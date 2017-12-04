const fs = require('fs');
const TriangleSorter = require('./triangleSorter');

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();

const triangleSorter = new TriangleSorter();

module.exports = {
  1: () => {
    triangleSorter.parseSpecRows(data);
    return triangleSorter.getValidTriangles().length;
  },
  2: () => {
    triangleSorter.parseSpecCols(data);
    return triangleSorter.getValidTriangles().length;
  }
}
