module.exports = class Elevator {
  constructor(floor) {
    this.contents = new Set();
    this.floor = floor;
  }

  getFloor() {
    return this.floor;
  }

  getContents() {
    return this.contents;
  }

  addItem(item) {
    this.contents.add(item);
  }

  removeItem(item) {
    const index = this.contents.indexOf(item);
    if (index > -1) {
      this.contents = this.contents.splice(index, 1);
    }
  }

  goUp() {
    this.floor += this.floor < 3 ? 1 : 0;
  }

  goDown() {
    this.floor -= this.floor > 0 ? 1 : 0;
  }

  serialize() {
    return JSON.stringify({
      floor: this.floor,
      contents: [...this.contents],
    });
  }
}

