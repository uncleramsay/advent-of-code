const _ = require('lodash');
const Bot = require('./bot');

module.exports = class BotController {
  constructor() {
    this.bots = [];
    this.outputs = [];
  }

  parseInstructions(file) {
    const instructions = file.split('\n');
    _.each(instructions, (instruction) => {

      let matches = instruction.match(/^bot (\d+)/);
      if (matches && matches[1]) {
        const botNumber = parseInt(matches[1], 10);
        this._createBotIfNecessary(botNumber);
        this.bots[botNumber].parseInstruction(instruction);
      } else {

        matches = instruction.match(/^value (\d+) goes to bot (\d+)$/);
        if (!matches || !matches[1] || !matches[2]) {
          console.error(`Couldn't parse instruction: ${instruction}`);
        }

        const botNumber = parseInt(matches[2], 10);
        const chip = parseInt(matches[1], 10);
        this._createBotIfNecessary(botNumber);
        this.bots[botNumber].addChip(chip);
      }
    });
  }

  followInstructions(min, max) {
    let finished = false;

    while (!finished) {
      // this.printStatus();
      // console.log();
      finished = true;

      _.each(this.bots, (bot, i) => {

        if (bot.getChipCount() === 2) {
          finished = false;

          if (min && max && bot.containsChips(min, max)) {
            console.log(`Bot ${i} compares the ${min} and ${max} values`);
          }

          switch (bot.getLowType()) {
            case 'bot':
              const botNumber = bot.getLowNum();
              const botChip = bot.getLowChip();
              // console.log(`Bot ${i} gives chip ${botChip} to bot ${botNumber}`);
              this.bots[botNumber].addChip(botChip);
              break;

            case 'output':
              const outputNumber = bot.getLowNum();
              const outputChip = bot.getLowChip();
              // console.log(`Bot ${i} gives chip ${outputChip} to output ${outputNumber}`);
              this._createOutputIfNecessary(outputNumber);
              this.outputs[outputNumber].push(outputChip);
              break;
          }

          switch (bot.getHighType()) {
            case 'bot':
              const botNumber = bot.getHighNum();
              const botChip = bot.getHighChip();
              // console.log(`Bot ${i} gives chip ${botChip} to bot ${botNumber}`);
              this.bots[botNumber].addChip(botChip);
              break;

            case 'output':
              const outputNumber = bot.getHighNum();
              const outputChip = bot.getHighChip();
              // console.log(`Bot ${i} gives chip ${outputChip} to output ${outputNumber}`);
              this._createOutputIfNecessary(outputNumber);
              this.outputs[outputNumber].push(outputChip);
              break;
          }
        }
      });
    }
  }

  printStatus() {
    _.each(this.bots, (bot, i) => {
      console.log(`Bot ${i} chips: ${bot.getChips()}`);
    });
    _.each(this.outputs, (output, i) => {
      console.log(`Output ${i} chips: ${output}`);
    })
  }

  getOutputs() {
    return this.outputs;
  }

  _createBotIfNecessary(botNumber) {
    if (!this.bots[botNumber]) {
        this.bots[botNumber] = new Bot();
      }
  }

  _createOutputIfNecessary(outputNumber) {
    if (!this.outputs[outputNumber]) {
      this.outputs[outputNumber] = [];
    }
  }
}

