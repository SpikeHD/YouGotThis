const Goal = require('../classes/Goal')
const GoalList = require('../classes/GoalList')
const GoalUser = require('../classes/GoalUser')

module.exports.getGoal = async (id) => {
  return await new Goal(id).get()
}

module.exports.getGoalList = async (userid) => {
  return await new GoalList(userid).get()
}

module.exports.getGoalUser = async (userid) => {
  return await new GoalUser(userid)
}