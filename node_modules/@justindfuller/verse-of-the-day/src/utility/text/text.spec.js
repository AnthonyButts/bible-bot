import test from 'ava';
import text from './text';

test('Normalizes text to just a string', (t) => {
  const string = '<p class="q1"><sup id="Prov.26.7" class="v">7</sup>like a lame man’s legs, which hang useless,</p>\n<p class="q2">is a proverb in the mouth of fools.</p>';
  const replaced = text(string);
  t.true(replaced === 'Like a lame man’s legs, which hang useless, is a proverb in the mouth of fools.');
});
