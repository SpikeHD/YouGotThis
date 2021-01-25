const ms = require('ms')
const { getGoal } = require('../helpers/getters')
const { MessageEmbed } = require('discord.js')

module.exports.info = {
  name: 'view',
  usage: 'view [id]',
  description: 'View details of a goal. You can only view your own goals, or others\' public goals.'
}

module.exports.run = async (bot, message, args) => {
  const embed = new MessageEmbed()
    .setColor('BLUE')
  const goalid = args[1].includes('#') ? args[1].split('#')[1] : args[1]
  let goal = null

  try {
    goal = await getGoal(goalid)
  } catch(e) {
    console.error(e)
    await message.channel.send('That goal does not exist on your list!')
    return
  }

  embed.setTitle(`"${goal.name}"`)

  if (goal.private && goal.userid !== message.author.id) return message.channel.send('You cannot view this goal. It may be private or not exist.')

  const goalUser = await bot.users.fetch(goal.userid)
  embed.setAuthor(goalUser.username, goalUser.avatarURL())
    .setDescription(`Progress: ${ms(Date.now() - goal.start)}\nStarted: ${new Date(goal.start).toLocaleDateString()}`)

  message.channel.send(embed)
}