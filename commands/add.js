
const { MessageEmbed } = require('discord.js')
const Goal = require('../classes/Goal')
const { timeParser } = require('../helpers/util')

module.exports.info = {
  usage: 'add "[name]" [updateframe | examples: "1d", "6mo", "1y"] [visibility | private/public]'
}

module.exports.run = async (bot, message, args) => {
  const embed = new MessageEmbed()
    .setTitle(`New goal for ${message.member.displayName}!`)
    .setAuthor(message.member.displayName, message.author.avatarURL())
    .setColor('GREEN')

  // New goal to push data into
  const goal = new Goal()
  goal.start = Date.now()
  goal.userid = message.author.id

  // Attempt to parse name
  try {
    goal.name = args.join(' ').split('"')[1].split('"')[0]
  } catch(e) {
    message.channel.send('Looks like you didn\'t format your goal\'s name correctly! Don\'t forget the closing quotation mark!')
    return
  }

  goal.every = args.join(' ').split('"')[2].split(' ')[1]
  goal.private = args.join(' ').split('"')[2].split(' ')[1] === 'private'

  // Error with time parser? Args must be incorrect
  try {
    embed.addField(`"${goal.name}"`, `Updates ${timeParser(goal.every).every}.`)
  } catch(e) {
    console.error(e)
    message.channel.send('There was an error in your command. Did you remember to provide an updateframe?')
    return
  }

  // Push everything to the database
  try {
    await goal.set()
  } catch(e) {
    console.error(e)
    message.channel.send('There was an error processing your goal.')
    return
  }

  message.channel.send(embed)
}

