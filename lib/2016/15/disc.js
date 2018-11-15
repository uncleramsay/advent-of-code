module.exports = class Disc {
  constructor(positions, currentPosition) {
    this.positions = positions;
    this.currentPosition = currentPosition;
    this.startPosition = currentPosition;
  }

  getCurrentPosition() {
    return this.currentPosition;
  }

  getStartPosition() {
    return this.startPosition;
  }

  getPositions() {
    return this.positions;
  }

  setCurrentPosition(position) {
    this.currentPosition = position;
  }
}
