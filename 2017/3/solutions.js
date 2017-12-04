const StressTest = require('./stressTest');
const INPUT = 265149;

module.exports = {
  1: () => {
    return findDistanceFromSquare(INPUT);
  },
  2: () => {
    const stressTest = new StressTest();
    return stressTest.getFirstEntryLargerThan(INPUT);
  }
}

function findDistanceFromSquare(num) {
  // Check for 1
  if (num === 1) {
    return 0;
  }

  let smallestDistance = Infinity;
  let closestEndpoint = 0;

  // Is it horizontally right from 1?
  const rightDistance = calculateDistanceHelper(2, num);
  const rightEndpoint = rightDistance[rightDistance.length - 1];
  if (rightEndpoint === num) {
    return rightDistance.length;
  } else {
    const closest = getClosestEndpoint(rightDistance, num);
    if (Math.abs(closest - num) < smallestDistance) {
      smallestDistance = Math.abs(closest - num);
      closestEndpoint = calculateDistanceHelper(1, closest).length - 1;
    }
  }

  // Is it vertically up from 1?
  const upDistance = calculateDistanceHelper(4, num);
  const upEndpoint = upDistance[upDistance.length - 1];
  if (upEndpoint === num) {
    return upDistance.length;
  } else {
    const closest = getClosestEndpoint(upDistance, num);
    if (Math.abs(closest - num) < smallestDistance) {
      smallestDistance = Math.abs(closest - num);
      closestEndpoint = calculateDistanceHelper(1, closest).length - 1;
    }
  }

  // Is it horizontall left from 1?
  const leftDistance = calculateDistanceHelper(6, num);
  const leftEndpoint = leftDistance[leftDistance.length - 1];
  if (leftEndpoint === num) {
    return leftDistance.length;
  } else {
    const closest = getClosestEndpoint(leftDistance, num);
    if (Math.abs(closest - num) < smallestDistance) {
      smallestDistance = Math.abs(closest - num);
      closestEndpoint = calculateDistanceHelper(1, closest).length - 1;
    }
  }

  // Is it vertically down from 1?
  const downDistance = calculateDistanceHelper(8, num);
  const downEndpoint = downDistance[downDistance.length - 1];
  if (downEndpoint === num) {
    return downDistance.length;
  } else {
    const closest = getClosestEndpoint(downDistance, num);
    if (Math.abs(closest - num) < smallestDistance) {
      smallestDistance = Math.abs(closest - num);
      closestEndpoint = calculateDistanceHelper(1, closest).length - 1;
    }
  }

  return closestEndpoint + smallestDistance;
}

function calculateDistanceHelper(start, max) {
  const endpoints = [start];

    while(endpoints[endpoints.length - 1] < max) {
      const lastEndpoint = endpoints[endpoints.length - 1];
      const nextEndpoint = lastEndpoint + (8 * endpoints.length) + (start - 1);
      endpoints.push(nextEndpoint);
    }

    return endpoints;
}

function getClosestEndpoint(endpoints, num) {
  return endpoints.reduce((closest, endpoint) => {
    if (Math.abs(endpoint - num) < Math.abs(closest - num)) {
      return endpoint;
    }
    return closest;
  }, endpoints[0])
}
