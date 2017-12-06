const fs = require('fs');
const Memory = require('./Memory');
const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();

const redistributions = trackRedistributions();

module.exports = {
  1: () => {
    return redistributions.count;
  },
  2: () => {
    return redistributions.distance;
  }
}

function trackRedistributions() {
  const memory = new Memory(data);
  const states = [];
  states.push(memory.getState());

  let count = 0;
  while(true) { // Loop until done
    memory.redistribute();
    count += 1;

    const newState = memory.getState();

    if (states.indexOf(newState) > -1) {
      return {
        count,
        distance: (states.length - states.indexOf(newState)),
      };
    }

    states.push(newState);
  }
}
