const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'toor',
  database: 'tin-example',
  multipleStatements: true,
  charset: 'utf8'
});

module.exports = pool.promise();