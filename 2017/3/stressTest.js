class StressTest {
  constructor() {
    this.objects = {};
  }

  getFirstEntryLargerThan(num) {
    let x = 0;
    let y = 0;
    let value = 1;

    let nextValue = 0;
    while(true) {
      nextValue = this.getValueForPosition(x, y);
      if (nextValue > num) {
        return nextValue;
      }

      this.place(x, y, nextValue);
      ({x, y} = this.getNextCoordinates(x, y));
    }
  }

  place(x, y, value) {
    if (typeof this.objects[x] !== 'object') {
      this.objects[x] = {};
    }

    this.objects[x][y] = value;
  }

  getValueForPosition(x, y) {
    if (x === 0 && y === 0) {
      return 1;
    }

    let value = 0;

    if (this.objects[x-1] && this.objects[x-1][y-1]) {
      value += this.objects[x-1][y-1];
    }

    if (this.objects[x-1] && this.objects[x-1][y]) {
      value += this.objects[x-1][y];
    }

    if (this.objects[x-1] && this.objects[x-1][y+1]) {
      value += this.objects[x-1][y+1];
    }

    if (this.objects[x] && this.objects[x][y-1]) {
      value += this.objects[x][y-1];
    }

    if (this.objects[x] && this.objects[x][y+1]) {
      value += this.objects[x][y+1];
    }

    if (this.objects[x+1] && this.objects[x+1][y-1]) {
      value += this.objects[x+1][y-1];
    }

    if (this.objects[x+1] && this.objects[x+1][y]) {
      value += this.objects[x+1][y];
    }

    if (this.objects[x+1] && this.objects[x+1][y+1]) {
      value += this.objects[x+1][y+1];
    }

    return value;
  }

  getNextCoordinates(x, y) {
    const left = this.objects[x-1] && this.objects[x-1][y];
    const below = this.objects[x] && this.objects[x][y+1];
    const right = this.objects[x+1] && this.objects[x+1][y];
    const above = this.objects[x] && this.objects[x][y-1];

    if (left && !right && !above) {
      // Go up
      return {x, y: y-1};
    }

    if (!left && below) {
      // Go left
      return {x: x-1, y};
    }

    if (!left && right && !below) {
      // Go down
      return {x, y: y+1};
    }

    // Go right
    return {x: x+1, y};
  }
}

module.exports = StressTest;
