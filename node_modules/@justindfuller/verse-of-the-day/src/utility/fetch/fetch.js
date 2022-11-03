import fetch from 'node-fetch';
import cache from './../cache';

async function fetchFromApi(url: string): Promise<any> {
  const cacheKey = `fetch:${url}`;
  const cached = await cache().getHash(cacheKey);

  const headers = {
    url,
    headers: {
      Authorization: `Basic ${process.env.APIKEY || ''}`,
    },
    resolveWithFullResponse: true,
  };

  if (cached) {
    return JSON.parse(cached.response);
  }

  const response: { body: string } = cached || await fetch(url, headers);
  const json = await response.json();
  const data = json.response;
  await cache().setHash(cacheKey, { response: JSON.stringify(data) });
  return data;
}

module.exports = fetchFromApi;
