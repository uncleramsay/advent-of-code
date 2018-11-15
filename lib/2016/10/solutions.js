const _ = require('lodash');
const fs = require('fs');
const BotController = require('./botController');

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();

const botController = new BotController();
botController.parseInstructions(data);

module.exports = {
  1: () => {
    botController.followInstructions(17, 61);
    return '';
  },
  2: () => {
    botController.followInstructions();
    const outputs = botController.getOutputs();
    return outputs[0] * outputs[1] * outputs[2];
  }
}
