const _ = require('lodash');
const fs = require('fs');
const Controller = require('./controller');

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();

const controller = new Controller();
controller.parseLocations(data);

module.exports = {
  1: () => {
    return '';
  },
  2: () => {
  }
}
