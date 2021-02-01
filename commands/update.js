const { MessageCollector } = require('discord.js')
const { getGoal } = require('../helpers/getters')
const { timeParser } = require('../helpers/util')

module.exports.info = {
  name: 'update',
  usage: 'update [id] [type] [change (optional)]',
  description: 'Update a goal. If resetting your goal, you will asked confirmation, otherwise, you will not.'
}

module.exports.run = async (bot, message, args) => {
  const type = args[2]
  const change = args[3]

  // Collector for resetting goal
  const filter = (m) => m.author.id === message.author.id
  const collector = new MessageCollector(message.channel, filter, { max: 1 })
  let goal, newName

  try {
    goal = await getGoal(args[1])
  } catch(e) {
    return message.channel.send(`"${args[1]}" is not a valid goal!`)
  }

  if (!type) return message.channel.send('Please specify a part of your goal to update!')

  /* eslint-disable indent */
  switch(type.toLowerCase()) {
    case 'name':
      try {
        newName = args.join(' ').split('"')[1].split('"')[0]
      } catch(e) {
        return message.channel.send('Specify a name to rename the goal to.')
      }

      goal.name = newName
      await goal.set()
      break

    case 'updateframe':
      if (!change || timeParser(change).unit === 'invalid') return message.channel.send('Specify a valid new updateframe!')

      goal.every = change
      await goal.set()
      break

    case 'reset':
      await message.channel.send('Are you sure you want to reset your goal? There\'s no shame in trying again! (yes/no)')

      collector.on('collect', async m => {
        if (m.content.toLowerCase() === 'yes') {
          const toEdit = await message.channel.send('Resetting goal...')

          goal.start = Date.now()
          await goal.set()
          await toEdit.edit('Done! You got it this time!')
        } else {
          await message.channel.send('Gotcha, your goal won\'t be reset. Keep it up!')
        }
      })
      break

    default:
      return message.channel.send('You can not change the part of your goal!')
  }
}