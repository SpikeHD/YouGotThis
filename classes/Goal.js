const sql = require('../helpers/mysql')

module.exports = class Goal {
  constructor(id) {
    this.id = id
  }

  async get() {
    const rows = sql.query('SELECT * FROM goals WHERE id=? LIMIT 1', [this.id])
    
    Object.keys(rows).forEach(k => {
      this[k] = rows[k]
    })

    return this
  }
}