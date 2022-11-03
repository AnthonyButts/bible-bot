const fetch = require('node-fetch')
const { parseStringPromise } = require('xml2js')

module.exports = {

    async getVerseOfTheDay() {

        let ref = 's'

        await fetch('https://www.biblegateway.com/usage/votd/rss/votd.rdf')
        .then(res => res.text())
        .then(res => parseStringPromise(res))
        .then(res => {

            ref = (res.rss.channel[0].item[0].title[0])

        })

        return ref


    }

}