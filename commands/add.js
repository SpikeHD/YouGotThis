
const { MessageEmbed } = require('discord.js')
const Goal = require('../classes/Goal')
const { getGoalList } = require('../helpers/getters')
const { timeParser } = require('../helpers/util')

module.exports.info = {
  name: 'add',
  usage: 'add "[name]" [updateframe | examples: "1d", "6mo", "1y"] [visibility | private/public]',
  description: 'Add a new goal to your list!'
}

module.exports.run = async (bot, message, args) => {
  const embed = new MessageEmbed()
    .setTitle(`New goal for ${message.member.displayName}!`)
    .setAuthor(message.member.displayName, message.author.avatarURL())
    .setColor('GREEN')

  // Goal list for checking amount
  const goalList = await getGoalList(message.author.id)

  if (goalList.items.length > 20) return message.channel.send('You cannot add any more goals! For now, 20 is the limit.')

  // New goal to push data into
  const goal = new Goal()
  goal.start = Date.now()
  goal.userid = message.author.id

  // Attempt to parse name
  try {
    goal.name = args.join(' ').split('"')[1].split('"')[0]
    goal.every = args.join(' ').split('"')[2].split(' ')[1]
    goal.private = args.join(' ').split('"')[2].split(' ')[2] === 'private'
  } catch(e) {
    message.channel.send('Looks like you didn\'t format your goal\'s name correctly! Don\'t forget the closing quotation mark!')
    return
  }

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

