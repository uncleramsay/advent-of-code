module.exports = class Floor {
  constructor(number) {
    this.number = number;
    this.contents = new Set();
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

  serialize() {
    return JSON.stringify({
      floor: this.number,
      contents: [...this.contents],
    });
  }
}

