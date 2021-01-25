const sql = require('../helpers/mysql')

module.exports = class Goal {
  constructor(id) {
    this.id = id

    // Defaults
    this.name = ''
    this.start = 0
    this.every = ''
    this.lastChecked = 0
  }

  /**
   * Used for creating or updating a Goal
   */
  async set() {
    const res = await sql.query(`INSERT INTO goals (name, start, every, lastChecked) VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE name=?, start=?, every=?, lastChecked=?`, [
      this.name,
      this.start,
      this.every,
      this.lastChecked,

      // For update
      this.name,
      this.start,
      this.every,
      this.lastChecked
    ])

    return res
  }

  /**
   * Used for grabbing a Goal
   */
  async get() {
    if (!this.id) throw new Error('No goal ID provided to constructor!')

    const rows = sql.query('SELECT * FROM goals WHERE id=? LIMIT 1', [this.id])
    
    Object.keys(rows).forEach(k => {
      this[k] = rows[k]
    })

    return this
  }
}