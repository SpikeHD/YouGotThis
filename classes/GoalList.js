const sql = require('../helpers/mysql')

module.exports = class GoalList {
  constructor(userid) {
    this.userid = userid
    this.items = []
  }

  async get() {
    if (!this.userid) throw new Error('No userid for goal list!')

    const rows = await sql.query('SELECT * FROM goals WHERE userid = ?', [this.userid])
    this.items = rows

    return this
  }

  search(q) {
    if (this.items.length === 0) throw new Error('No items in goal list!')
    
    return this.items.filter(i => i.name.toLowerCase().includes(q.toLowerCase()) || i.description.toLowerCase().includes(q.toLowerCase()))
  }
}