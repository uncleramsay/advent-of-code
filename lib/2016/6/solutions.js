const _ = require('lodash');
const fs = require('fs');
const SignalDecoder = require('./signalDecoder');

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();

const signalDecoder = new SignalDecoder();
signalDecoder.parseSignal(data);

module.exports = {
  1: () => {
    return signalDecoder.getDecodedMessage();
  },
  2: () => {
    return signalDecoder.getModifiedDecodedMessage();
  }
}
