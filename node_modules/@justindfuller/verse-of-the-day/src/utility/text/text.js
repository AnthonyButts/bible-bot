import { upperFirst } from 'lodash';

function normalizeText(text: string = ''): string {
  return upperFirst(text.replace(/<p(.*?)<\/sup>/igm, ' ')
             .replace('\n', ' ')
             .replace(/<(.*?)>/igm, ' ')
             .replace(/\s{2,}/igm, ' ')
             .replace(/^\s+/igm, '')
             .replace(/\s+$/igm, ''));
}

module.exports = normalizeText;
