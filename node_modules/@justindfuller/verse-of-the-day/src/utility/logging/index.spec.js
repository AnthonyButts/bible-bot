import test from 'ava';
import logging from './index';

test('it returns console by default', (t) => {
  t.false(Object.hasOwnProperty.call(logging(null), 'streams'));
});

test('it returns bunyan in environments', (t) => {
  t.true(Object.hasOwnProperty.call(logging('test'), 'streams'));
});
