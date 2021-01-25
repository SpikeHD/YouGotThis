const Goal = require('../classes/Goal')
const GoalList = require('../classes/GoalList')

module.exports.getGoal = async (id) => {
  return await new Goal(id).get()
}

module.exports.getGoalList = async (userid) => {
  return  await new GoalList(userid).get()
}