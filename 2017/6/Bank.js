class Bank {
  constructor(blocks) {
    this.blocks = parseInt(blocks, 10);
  }

  getBlocks() {
    return this.blocks;
  }

  reset() {
    this.blocks = 0;
  }

  increment() {
    this.blocks += 1;
  }
}

module.exports = Bank;
