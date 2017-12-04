const _ = require('lodash');
const fs = require('fs');
const IpAnalyser = require('./ipAnalyser');

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();

const ipAnalyser = new IpAnalyser();
ipAnalyser.parseIps(data);

module.exports = {
  1: () => {
    return ipAnalyser.countTlsIps();
  },
  2: () => {
    return ipAnalyser.countSslIps();
  }
}
