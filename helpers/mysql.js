const mysql = require('mysql2')
const { sql } = require('../config.json')
const con = mysql.createConnection({
  host: sql.host,
  user: sql.user,
  password: sql.pass,
  database: sql.db
})

module.exports = con