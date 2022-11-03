const Discord = require('discord.js')
const DotEnv = require('dotenv')
const Bible = require('holy-bible')
const ChapterAndVerse = require('chapter-and-verse')
const BibleGateway = require('./utils/BibleGateway')

DotEnv.config()

var client = new Discord.Client(
    {
        intents: [
            'GUILDS',
            'GUILD_MESSAGES'
        ]
    }
)

client.on('ready', async () => {

    const guildId = '916404952363044974'
    const guild = await client.guilds.cache.get(guildId)

    setInterval( async () => {
        await client.user.setActivity(
            {
                name: await BibleGateway.getVerseOfTheDay(),
                type: 'PLAYING'
            }
        )
    }, 30000)


    await guild.commands.create(
        {
            name: 'getverse',
            description: 'Get a verse from the bible.',
            options: [
                {
                    name: 'book',
                    type: 'STRING',
                    description: 'Book in the bible.',
                    required: true
                },
                {
                    name: 'chapter',
                    description: 'Chapter from the book.',
                    type: 'INTEGER',
                    required: true
                },
                {
                    name: 'verse',
                    description: 'Verse from the chapter.',
                    type: 'INTEGER',
                    required: true
                }
            ]
        }
    )

    await guild.commands.create(
        {
            name: 'getverses',
            description: 'Get verses from one verse to another.',
            options: [
                {
                    name: 'book',
                    type: 'STRING',
                    description: 'Book in the bible.',
                    required: true
                },
                {
                    name: 'chapter',
                    description: 'Chapter from the book.',
                    type: 'INTEGER',
                    required: true
                },
                {
                    name: 'startverse',
                    description: 'Starting verse.',
                    type: 'INTEGER',
                    required: true
                },
                {
                    name: 'endverse',
                    description: 'Sending verse.',
                    type: 'INTEGER',
                    required: true
                }
            ]
        }
    )

    await guild.commands.create(
        {
            name: 'getchapter',
            description: 'Get a chapter from a book.',
            options: [
                {
                    name: 'book',
                    type: 'STRING',
                    description: 'Book in the bible.',
                    required: true
                },
                {
                    name: 'chapter',
                    description: 'Chapter from the book.',
                    type: 'INTEGER',
                    required: true
                }
            ]
        }
    )

    await guild.commands.create(
        {
            name: 'votd',
            description: 'Get the verse of the day.',
        }
    )

})

client.on('interactionCreate', async ( interaction ) => {

    if (!interaction.isCommand()) return

    if (interaction.commandName == 'getverse') {

        const bookOption = await interaction.options.getString('book')
        const chapterOption = await interaction.options.getInteger('chapter')
        const verseOption = await interaction.options.getInteger('verse')

        var cv = ChapterAndVerse(`${bookOption} ${chapterOption}:${verseOption}`)
    
        if (cv.success) {

            var response = await Bible.get(`${bookOption} ${chapterOption} ${verseOption}`, 'kjv').then( ( response ) => { return response })
            var passage = `${cv.book.name} ${chapterOption}:${verseOption}`

            interaction.reply(
                {
                    embeds: [
                        {
                            color: 'BLURPLE',
                            description: `*${response.text}*\n\nPassage: \`${passage}\`\nTranslation: \`KJV\`\n\nhttps://www.biblegateway.com/passage/?search=${bookOption}+${chapterOption}.${verseOption}&version=KJV`,
                        }
                    ]
                }
            )
        } else {

            switch (cv.reason) {

                case 'book does not exist':
                    interaction.reply(
                        {
                            embeds: [
                                {
                                    color: 'RED',
                                    description: `Cannot find book \`${bookOption}\` in the bible.`,
                                }
                            ],
                            ephemeral: true
                        }
                    )
                    break

                case 'chapter does not exist':
                    interaction.reply(
                        {
                            embeds: [
                                {
                                    color: 'RED',
                                    description: `Cannot find chapter \`${chapterOption}\` in the bible.`,
                                }
                            ],
                            ephemeral: true
                        }
                    )
                    break

                    case 'verse does not exist':
                        interaction.reply(
                            {
                                embeds: [
                                    {
                                        color: 'RED',
                                        description: `Cannot find verse \`${verseOption}\` in the bible.`,
                                    }
                                ],
                                ephemeral: true
                            }
                        )
                        break
    
            }


        }
        return
    }

    if (interaction.commandName == 'getverses') {

        const bookOption = await interaction.options.getString('book')
        const chapterOption = await interaction.options.getInteger('chapter')
        const startVerseOption = await interaction.options.getInteger('startverse')
        const endVerseOption = await interaction.options.getInteger('endverse')

        var cv = ChapterAndVerse(`${bookOption} ${chapterOption}:${startVerseOption}-${endVerseOption}`)
    

        if (cv.success) {

            var response = await Bible.get(`${bookOption} ${chapterOption} ${startVerseOption}-${endVerseOption}`, 'kjv').then( ( response ) => { return response })
            var passage = `${cv.book.name} ${chapterOption}:${startVerseOption}-${endVerseOption}`

            interaction.reply(
                {
                    embeds: [
                        {
                            color: 'BLURPLE',
                            description: `*${response.text}*\n\nPassage: \`${passage}\`\nTranslation: \`KJV\`\n\nhttps://www.biblegateway.com/passage/?search=${bookOption}+${chapterOption}.${startVerseOption}-${endVerseOption}/&version=KJV`,
                        }
                    ]
                }
            ).catch( (err) => {
                interaction.reply(
                    {
                        embeds: [
                            {
                                color: 'BLURPLE',
                                description: `Because of Discord's limitations, we're only able to show verses that are under \`4096\` in length.`,
                            }
                        ],
                        ephemeral: true
                    }
                )
            })
        } else {

            switch (cv.reason) {

                case 'book does not exist':
                    interaction.reply(
                        {
                            embeds: [
                                {
                                    color: 'RED',
                                    description: `Cannot find book \`${bookOption}\` in the bible.`,
                                }
                            ],
                            ephemeral: true
                        }
                    )
                    break

                case 'chapter does not exist':
                    interaction.reply(
                        {
                            embeds: [
                                {
                                    color: 'RED',
                                    description: `Cannot find chapter \`${chapterOption}\` in the bible.`,
                                }
                            ],
                            ephemeral: true
                        }
                    )
                    break

                    case 'verse does not exist':
                        interaction.reply(
                            {
                                embeds: [
                                    {
                                        color: 'RED',
                                        description: `Cannot find verses \`${startVerseOption}-${endVerseOption}\` in the bible.`,
                                    }
                                ],
                                ephemeral: true
                            }
                        )
                        break
    
            }


        }
        return
    }

    if (interaction.commandName == 'votd') {

        let ref = await BibleGateway.getVerseOfTheDay()
        let verseOfTheDay = await Bible.get(ref, 'KJV').then( res => { return res })

        interaction.reply(
            {
                embeds: [
                    {
                        color: 'BLURPLE',
                        description: `*${verseOfTheDay.text}*\n\nPassage: \`${ref}\`\nTranslation: \`KJV\`\n\nhttps://www.biblegateway.com/passage/?search=${ref.replace(' ','.').replace(':','.')}&version=KJV`,
                    }
                ]
            }
        )

        return
    }



})

client.login(process.env.TOKEN)