const sql = require('../helpers/mysql')

module.exports = class Goal {
  /**
   * Class for holding information on a goal
   * 
   * @param {Number|String} id 
   */
  constructor(id) {
    this.id = id

    // Defaults
    this.userid = 0
    this.name = ''
    this.start = 0
    this.every = ''
  }

  /**
   * Used for creating or updating a Goal
   */
  async set() {
    const res = await sql.promise().query(`INSERT INTO goals (userid, name, start, every, lastChecked, private) VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE name=?, start=?, every=?, private=?`, [
      this.userid,
      this.name,
      this.start,
      this.every,
      this.private,

      // For update
      this.name,
      this.start,
      this.every,
      this.private
    ])

    // TODO self-assign the ID of the row in case of insert
    return res[0]
  }

  /**
   * Used for grabbing a Goal
   */
  async get() {
    if (!this.id) throw new Error('No goal ID provided to constructor!')

    const rows = await sql.promise().query('SELECT * FROM goals WHERE id=? LIMIT 1', [this.id])
    
    // Since the class properties match the table columns, we can cheat
    Object.keys(rows[0]).forEach(k => {
      this[k] = rows[0][k]
    })

    return this
  }
}