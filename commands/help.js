const { MessageEmbed } = require('discord.js')
const { prefix } = require('../config.json')
const { cap } = require('../helpers/util')

module.exports.info = {
  name: 'help',
  usage: 'help',
  description: 'Get a list of commmands and other useful stuff.'
}

module.exports.run = (bot, message) => {
  const embed = new MessageEmbed()
    .setTitle('Help & Information')
    .setColor('ORANGE')

  bot.commands.forEach(c => {
    const info = c.info

    embed.addField(cap(info.name), `Description: ${info.description}\nUsage: \`${prefix + info.usage}\``)
  })

  embed.setFooter('Other useful links: Nothing here yet!')

  message.channel.send(embed)
}