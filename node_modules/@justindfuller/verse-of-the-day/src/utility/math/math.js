import { random } from 'lodash';

function getRandomInt(max: number): number {
  return random(0, max);
}

module.exports = getRandomInt;
