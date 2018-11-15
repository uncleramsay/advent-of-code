const _ = require('lodash');
const Bank = require('./Bank');

class Memory {
  constructor(distribution) {
    this.banks = [];
    distribution.split(/\s/).forEach((blocks) => {
      this.banks.push(new Bank(blocks));
    });
  }

  getFullestBankIndex() {
    return _.reduce(this.banks, (highestIndex, bank, i) => {
      if (bank.getBlocks() > this.banks[highestIndex].getBlocks()) {
        return i;
      }

      return highestIndex;
    }, 0);
  }

  redistribute() {
    let index = this.getFullestBankIndex();
    let blocks = this.banks[index].getBlocks();
    this.banks[index].reset();


    while(blocks) {
      index = (index + 1 === this.banks.length) ? 0 : index + 1;

      this.banks[index].increment();
      blocks -= 1;
    }
  }

  getState() {
    return _.reduce(this.banks, (rval, bank) => {
      return rval + `${bank.getBlocks()} `;
    }, '');
  }

  print() {
    console.log('Current State:', this.getState());
  }
}

module.exports = Memory;
