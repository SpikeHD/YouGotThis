const mysql = require('mysql')
const { sql } = require('../config.json')
const pool = mysql.createPool({
  connectionLimit: 10,
  host: sql.host,
  user: sql.user,
  password: sql.pass,
  database: sql.database
})

module.exports = pool