// get the client
const mysql = require('mysql2');

// create the connection to database
// multipleStatements = true -> enable multiple calls while creating the connection, used in case of calling stored procedures with IN and OUT params.
const connection = mysql.createConnection({
  host: '127.0.0.1', // 'localhost',
  user: 'root',
  password: 'veselin1988',
  database: 'db_demo',
  multipleStatements: true
});

module.exports = connection;
