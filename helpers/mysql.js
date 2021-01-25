const mysql = require('mysql')
const { sql } = require('../config.json')
const con = mysql.createConnection({
  connectionLimit: 10,
  host: sql.host,
  user: sql.user,
  password: sql.pass,
  database: sql.db
})

module.exports = con