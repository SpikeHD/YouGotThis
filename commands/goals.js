const { MessageEmbed } = require('discord.js')
const ms = require('ms')
const { getGoalList } = require('../helpers/getters')

module.exports.info = {
  name: 'goals',
  usage: 'goals [(optional) visibility | public/private/all]',
  description: 'View your goal list! Don\'t worry, private ones won\'t show up unless you want them to.'
}

module.exports.run = async (bot, message, args) => {
  const embed = new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL())
    .setTitle('Goals List')
    .setColor('BLUE')

  const list = await getGoalList(message.author.id)
  let goals = list.getPublic()

  if (args[1]) {
    /* eslint-disable indent */
    switch(args[1].toLowerCase()) {
      default:
      case 'public':
        break

      case 'private':
        goals = list.getPrivate()
        break

      case 'all':
        goals = list.items
        break
    }
  }

  if (goals && goals.length > 0) {
    goals.forEach(g => {
      embed.addField(`(ID #${g.id}) ${g.name}`, `Progress: ${ms(Date.now() - g.start, { long: true })}`)
    })
  } else {
    embed.setDescription('You have no goals to display!')
  }
  
  message.channel.send(embed)
}