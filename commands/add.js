
const { MessageEmbed } = require('discord.js')
const Goal = require('../classes/Goal')
const { timeParser } = require('../helpers/util')

module.exports.info = {
  usage: 'add "[name]" [updateframe | examples: "1d", "6mo", "1y"]'
}

module.exports.run = async (bot, message, args) => {
  const embed = new MessageEmbed()
    .setTitle(`New goal for ${message.member.displayName}!`)
    .setAuthor(message.member.displayName, message.author.avatarURL())
    .setColor('GREEN')

  // New goal to push data into
  const goal = new Goal()
  goal.start = Date.now()

  try {
    goal.name = args.join(' ').split('"')[1].split('"')[0]
  } catch(e) {
    message.channel.send('Looks like you didn\'t format your goal\'s name correctly! Don\'t forget the closing quotation mark!')
    return
  }

  goal.every = args[args.length-1]

  embed.addField(`"${goal.name}"`, `Updates ${timeParser(goal.every).every}.`)

  try {
    await goal.set()
  } catch(e) {
    console.error(e)
    message.channel.send('There was an error processing your goal.')
    return
  }

  message.channel.send(embed)
}

