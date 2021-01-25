const { getGoal } = require('../helpers/getters')
const { MessageCollector } = require('discord.js')

module.exports.run = async (bot, message, args) => {
  const goalid = args[1].includes('#') ? args[1].split('#')[1] : args[1]
  let goal = null

  try {
    goal = await getGoal(goalid)
  } catch(e) {
    await message.channel.send('That goal does not exist on your list!')
    return
  }

  if (message.author.id !== goal.userid) return message.channel.send('That goal does not exist on your list!')

  await message.channel.send(`Are you sure you want to delete the goal "${goal.name}"? "yes"/"no"`)

  const filter = (m) => m.author.id === message.author.id
  const collector = new MessageCollector(message.channel, filter, { max: 1 })

  collector.on('collect', async (m) => {
    if (m.content.toLowerCase() === 'yes') {
      const toEdit = await message.channel.send('Deleting goal...')
      await goal.remove()
      await toEdit.edit('Done!')
    } else {
      await message.channel.send('Gotcha, your goal will not be deleted.')
    }
  })
}