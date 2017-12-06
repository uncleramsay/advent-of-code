const _ = require('lodash');
const fs = require('fs');
const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
const maze = data.split('\n');



module.exports = {
  1: () => {
    return traverseMap((position, instruction) => {
      maze[position] = instruction + 1;
    });
  },
  2: () => {
    return traverseMap((position, instruction) => {
      if (instruction >= 3) {
        maze[position] = instruction - 1;
      } else {
        maze[position] = instruction + 1;
      }
    });
  }
}

function traverseMap(updatePositionFn) {
  let count = 0;
  let position = 0;

  while(position >=0 && position < maze.length) {
    const instruction = parseInt(maze[position], 10);

    // Jump
    const newPosition = position + instruction;

    // Update Position
    updatePositionFn(position, instruction);

    position = newPosition;
    count += 1;
  }

  return count;
}
