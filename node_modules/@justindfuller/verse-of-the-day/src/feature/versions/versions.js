import endpoint from './../endpoints';
import fetchFromApi from './../../utility/fetch/fetch';

function createVersion(version) {
  return {
    id: version.id,
    name: version.name,
    language: version.lang_name,
  };
}

async function getListOfVersions() {
  const res = await fetchFromApi(endpoint().versions);
  const versions = res.versions.map(createVersion);
  return versions;
}

module.exports = getListOfVersions;
