
const { MessageEmbed } = require('discord.js')
const sql = require('./mysql')
const badges = require('../badges.json')
const GoalUser = require('../classes/GoalUser')
const ms = require('ms')

module.exports = (bot) => {
  console.log('Goal watcher started')
  setInterval(async () => {
    // We don't want to annouce a private goal by accident
    const goals = (await sql.promise().query('SELECT * FROM goals WHERE NOT private'))[0]

    goals.forEach(async g => {
      const goalTime = ms(Date.now() - g.start)
      const goalUser = new GoalUser(g.userid)
      
      if (badges[goalTime] && !goalUser.hasAchievment(badges[goalTime], g.name)) {
        // Notify and award badge
        const user = await bot.users.fetch(g.userid)
        const embed = new MessageEmbed()
          .setTitle('New Achievement')
          .setAuthor(user.username, user.avatarURL())
          .setDescription(`You just achieved "${goalTime}" for your goal: "${g.name}"`)
          .setThumbnail(`../${badges[goalTime].image}`)

        await goalUser.addAchievment(goalTime)

        user.send(embed)
      }
    })
  }, 60 * 100)
}