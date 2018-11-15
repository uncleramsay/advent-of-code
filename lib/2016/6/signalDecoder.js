const _ = require('lodash');

module.exports = class SignalDecoder {
  constructor() {
    this.messages = [];
    this.characterFrequency = [];
  }

  parseSignal(signal) {
    this.messages = signal.split('\n');
  }

  getDecodedMessage() {
    return this._decodedMessageHelper((charCounts) => {
      return Object.keys(charCounts).sort((a, b) => {
        return -(charCounts[a] - charCounts[b]);
      });
    });
  }

  getModifiedDecodedMessage() {
    return this._decodedMessageHelper((charCounts) => {
      return Object.keys(charCounts).sort((a, b) => {
        return (charCounts[a] - charCounts[b]);
      });
    });
  }

  _decodedMessageHelper(sortFn) {
    _.each(this.messages, (message) => {
      for (let i = 0; i < message.length; i++) {
        const char = message[i];

        if (!this.characterFrequency[i]) {
          this.characterFrequency[i] = {};
        }

        this.characterFrequency[i][char] = this.characterFrequency[i][char] ? this.characterFrequency[i][char] + 1 : 1;
      }
    });

    let decodedMessage = '';
    _.each(this.characterFrequency, (charCounts) => {
      const sortedChars = sortFn(charCounts);

      decodedMessage += sortedChars[0];
    });

    return decodedMessage;
  }
}
