const sql = require('../helpers/mysql')

module.exports = class GoalList {
  /**
   * Class for holding a list of goals held by a user
   * 
   * @param {Number|String} userid 
   */
  constructor(userid) {
    this.userid = userid
    this.items = []
  }

  /**
   * Grabs the list of goals for a user
   */
  async get() {
    if (!this.userid) throw new Error('No userid for goal list!')

    const rows = await sql.promise().query('SELECT * FROM goals WHERE userid = ?', [this.userid])
    this.items = rows[0]

    return this
  }

  /**
   * Get only private goals
   */
  getPrivate() {
    return this.items.filter(g => g.private)
  }

  /**
   * Get only public goals 
   */
  getPublic() {
    return this.items.filter(g => !g.private)
  }

  /**
   * Searches through the list of goals
   * 
   * @param {String} q 
   */
  search(q) {
    if (this.items.length === 0) throw new Error('No items in goal list!')
    
    // No idea if I will actually use this anywhere yet
    return this.items.filter(i => i.name.toLowerCase().includes(q.toLowerCase()) || i.description.toLowerCase().includes(q.toLowerCase()))
  }
}