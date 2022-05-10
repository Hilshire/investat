var mysql = require('mysql');

const {
    HOST='localhost',
    DATABASE='db',
    PORT=3306,
    USERNAME="me",
    PWD="secret"
} = process.env

module.exports = mysql.createPool({
  host     : HOST,
  user     : USERNAME,
  password : PWD,
  port     : PORT,
  database : DATABASE
});
