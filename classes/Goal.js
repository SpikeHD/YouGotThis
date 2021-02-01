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
    this.private = false
  }

  /**
   * Used for creating or updating a Goal
   */
  async set() {
    const res = await sql.promise().query(`INSERT INTO goals (id, userid, name, start, every, private)
    VALUES (${this.id || '(SELECT SUM(t.id+1) FROM (SELECT MAX(id) as id FROM goals) AS t ORDER BY t.id DESC LIMIT 1)'}, ?, ?, ?, ?, ?) 
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
      this.private,
    ])

    return res[0]
  }

  /**
   * Used for grabbing a Goal
   */
  async get() {
    if (!this.id) throw new Error('No goal ID provided to constructor!')

    const rows = (await sql.promise().query('SELECT * FROM goals WHERE id=? LIMIT 1', [this.id]))[0][0]

    if (!rows) throw new Error('No goal matching ID: ' + this.id)
    
    // Since the class properties match the table columns, we can cheat
    Object.keys(rows).forEach(k => {
      this[k] = rows[k]
    })

    return this
  }

  /**
   * Remove a goal from the DB
   */
  async remove() {
    if (!this.id) throw new Error('No goal ID provided to constructor!')

    // We don't want to accidentally delete someone else's goal.
    const res = await sql.promise().query('DELETE FROM goals WHERE id=? AND userid=?', [this.id, this.userid])

    return res
  }
}