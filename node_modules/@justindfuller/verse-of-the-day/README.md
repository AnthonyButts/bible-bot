# Verse-Of-The-Day-Server

[ ![Codeship Status for JustinDFuller/Verse-Of-The-Day-Server](https://app.codeship.com/projects/ba3c85c0-ed41-0134-977a-7ab4e0ed4895/status?branch=master)](https://app.codeship.com/projects/208532)
[![Coverage Status](https://coveralls.io/repos/github/JustinDFuller/Verse-Of-The-Day-Server/badge.svg?branch=master)](https://coveralls.io/github/JustinDFuller/Verse-Of-The-Day-Server?branch=master)

Backend micro service for displaying a Bible verse of the day.

### API

`/echo`
- Method: `ANY`
- Returns: `Object` with `success` set to true and a `message` letting you know you've successfully pinged the server. This is used to verify the service is up and running correctly.

`/dailyVerse/?:bibleVersion`
- Method: `GET`
- Returns: `Array` with three `Verse` objects. A random, Psalm, and Proverb.
- If you choose to add `:bibleVersion` like `/eng-ESV` it will return that translation. This is optional.

`/proverb/?:bibleVersion`
- Method: `GET`
- Returns: `Object` with a Proverb `Verse` object.
- If you choose to add `:bibleVersion` like `/eng-ESV` it will return that translation. This is optional.

`/psalm/?:bibleVersion`
- Method: `GET`
- Returns: `Object` with a Psalm `Verse` object.
- If you choose to add `:bibleVersion` like `/eng-ESV` it will return that translation. This is optional.

`/random/?:bibleVersion`
- Method: `GET`
- Returns: `Object` with a random book/chapter/verse `Verse` object.
- If you choose to add `:bibleVersion` like `/eng-ESV` it will return that translation. This is optional.

`/versions`
- Method: `GET`
- Returns: `Array` containing `Objects` representing the different translations available.
