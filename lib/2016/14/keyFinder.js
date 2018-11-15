const _ = require('lodash');
const md5 = require('md5');

module.exports = class KeyFinder {
  constructor(salt) {
    this.salt = salt;
    this.pendingKeys = [];
    this.confirmedKeys = [];
  }

  findLastKey(limit, stretch) {
    let counter = 0;
    let targetIndex = 100000;
    while(counter < targetIndex) {
      const key = this.salt + counter;
      const hash = this._getHash(key, stretch);

      this._checkForMatch(hash, counter);
      this._checkForPending(hash, counter);

      if (targetIndex === 100000 && this.confirmedKeys.length >= limit) {
        this._sortConfirmedKeys();
        targetIndex = this.confirmedKeys[limit - 1].counter + 1000;
      }

      counter += 1;

      if (counter % 100 === 0) {
        this._displayProgress(counter);
      }
    }

    this._displayProgress(counter);
    console.log();

    this._sortConfirmedKeys();
    return this.confirmedKeys[limit - 1].counter;
  }

  _getHash(key, stretch) {
    let hash = md5(key);

    if (stretch) {
      for (let i = 0; i < 2016; i++) {
        hash = md5(hash);
      }
    }

    return hash;
  }

  _displayProgress(count) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Tested ${count}, found ${this.confirmedKeys.length}`);
  }

  _sortConfirmedKeys() {
    this.confirmedKeys.sort((a, b) => {
      return a.counter - b.counter;
    });
  }

  _checkForMatch(hash, counter) {
    let indicesToRemove = [];
    _.each(this.pendingKeys, (pendingKey, i) => {

      // Remove invalid keys
      if (pendingKey.counter <= (counter - 1000)) {
        indicesToRemove.push(i);
        return;
      }

      // Check for matches
      const quintupleRegex = new RegExp(`(${pendingKey.char})\\1\\1\\1\\1`);
      if (quintupleRegex.test(hash)) {
        this.confirmedKeys.push(_.extend(pendingKey, {
          confirmHash: hash,
        }));
        indicesToRemove.push(i);
      }
    });

    _.each(indicesToRemove.reverse(), (index) => {
      this.pendingKeys.splice(index, 1);
    });
  }

  _checkForPending(hash, counter) {
    const tripleRegex = /(.)\1\1/;

    let matches = hash.match(tripleRegex);
    if (matches) {
      this.pendingKeys.push({
        char: matches[1],
        counter,
        hash,
      });

      // for (let i = counter + 1; i < counter + 1001; i++) {
      //   const index = this.salt + i;
      //   const confirmHash = md5(index);

      //   const quintupleRegex = new RegExp(`(${matches[1]})\\1\\1\\1\\1`);
      //   if (quintupleRegex.test(confirmHash)) {
      //     this.confirmedKeys.push({
      //       char: matches[1],
      //       counter,
      //       hash,
      //       confirmHash,
      //     });
      //     break;
      //   }
      // }
    }
  }
}
