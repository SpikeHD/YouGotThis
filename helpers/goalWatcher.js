const sql = require('./mysql')

module.exports = async () => {
  setInterval(async () => {
    // We don't want to annouce a private goal by accident
    const goals = (await sql.promise().query('SELECT * FROM goals WHERE NOT private'))[0]
  }, 60 * 1000)
}