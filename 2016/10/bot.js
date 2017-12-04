module.exports = class Bot {
  constructor() {
    this.chips = [];
  }

  parseInstruction(instruction) {
    const matches = instruction.match(/^bot \d+ gives low to (output|bot) (\d+) and high to (output|bot) (\d+)$/);
    if (!matches || !matches[2] || !matches[4]) {
      console.error(`Couldn't parse instruction: ${instruction}`);
    }

    this.lowType = matches[1];
    this.lowNum = parseInt(matches[2], 10);
    this.highType = matches[3];
    this.highNum = parseInt(matches[4], 10);
  }

  getChips() {
    return this.chips;
  }

  getChipCount() {
    return this.chips.length;
  }

  addChip(chip) {
    this.chips.push(chip);
    this._sortChips();
  }

  containsChips(min, max) {
    return this.chips.indexOf(min) > -1 && this.chips.indexOf(max) > -1;
  }

  _sortChips() {
    this.chips.sort((a, b) => {
      return parseInt(a, 10) > parseInt(b, 10);
    });
  }

  getLowType() {
    return this.lowType;
  }

  getLowNum() {
    return this.lowNum;
  }

  getLowChip() {
    return this.chips.shift();
  }

  getHighType() {
    return this.highType;
  }

  getHighNum() {
    return this.highNum;
  }

  getHighChip() {
    return this.chips.pop();
  }
}

