const sql = require('../helpers/mysql')

module.exports = class GoalUser {
  constructor(userid) {
    this.id = userid
  }

  async get() {
    return this
  }

  async achievments() {
    if (!this.id) throw new Error('User ID not provided in constructor!')

    const rows = (await sql.promise().query('SELECT * FROM achievements WHERE userid=?', [this.id]))[0][0]

    return rows
  }

  async hasAchievment(name, goal) {
    if (!this.id) throw new Error('User ID not provided in constructor!')

    const rows = await this.achievments()

    return rows.find(a => name === a.name && a.userid === this.id && goal === a.goal)
  }

  async addAchievment(name) {
    if (!this.id) throw new Error('User ID not provided in constructor!')

    const res = (await sql.promise().query('INSERT INTO achievements (userid, name) VALUE (?, ?)', [this.id, name]))[0]

    return res
  }
}