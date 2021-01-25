const { MessageEmbed } = require('discord.js')
const ms = require('ms')
const { getGoalList } = require('../helpers/getters')

module.exports.info = {
  usage: 'goals [(optional) visibility | public/private/all]'
}

module.exports.run = async (bot, message, args) => {
  const embed = new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL())
    .setTitle('Goals List')
    .setColor('BLUE')

  const list = await getGoalList(message.author.id)
  let goals = list.items

  if (args[1]) {
    goals = args[1] === 'public' ? list.getPublic() : list.getPrivate()
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