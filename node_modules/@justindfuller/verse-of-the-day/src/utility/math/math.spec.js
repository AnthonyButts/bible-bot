import test from 'ava';
import math from './math';

test('Gets a random number in range', (t) => {
  const max = 20;
  t.true(math(max) <= max);
});
