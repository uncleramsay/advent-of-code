const _ = require('lodash');

module.exports = class MapMaker {
  constructor(favouriteNumber) {
    this.favouriteNumber = favouriteNumber;
  }

  printMap(maxX, maxY) {
    // Header row
    let row = '  ';
    for (let x = 0; x <= maxX; x++) {
      row += x < 10 ? '0'+x : x;
    }
    console.log(row);

    for (let y = 0; y <= maxY; y++) {
      row = y < 10 ? '0'+y : y;

      for (let x = 0; x <= maxX; x++) {
        row += this.isOpenSpace(x, y) ? '  ' : ' #';
      }

      console.log(row);
    }
  }

  isOpenSpace(x, y) {
    let sum = x*x + 3*x + 2*x*y + y + y*y;
    sum += this.favouriteNumber;

    const binary = sum.toString(2);
    let count = 0;
    _.each(binary, (char) => {
      count += char === '1' ? 1 : 0;
    });

    return count % 2 === 0;
  }
}
