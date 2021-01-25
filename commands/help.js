const { MessageEmbed } = require('discord.js')
const { prefix } = require('../config.json')

module.exports.info = {
  name: 'help',
  usage: 'help',
  description: 'Get a list of commmands and other useful stuff.'
}

module.exports.run = (bot, message, args) => {
  const embed = new MessageEmbed()
    .setTitle('Help & Information')
    .setColor('ORANGE')

  bot.commands.forEach(c => {
    const info = c.info

    embed.addField(info.name[0].toUpperCase() + info.name.substr(1), `Description: ${info.description}\nUsage: \`${prefix + info.usage}\``)
  })

  embed.setFooter(`Other useful links: Nothing here yet!`)

  message.channel.send(embed)
}