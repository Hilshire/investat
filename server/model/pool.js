var mysql = require('mysql');

const {
    HOST='localhost',
    DATABASE='db',
    PORT=3306,
    USERNAME="me",
    PASSWORD="secret"
} = process.env

module.exports = mysql.createPool({
  host     : HOST,
  user     : USERNAME,
  password : PASSWORD,
  port     : PORT,
  database : DATABASE
});
