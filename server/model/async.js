var mysql = require('mysql');

const {
    HOST='localhost',
    DATABASE='db',
    PORT=3306,
    USERNAME="me",
    PASSWORD="secret",
    TABLE_NAME="table"
} = process.env

const connection = mysql.createConnection({
  host     : HOST,
  user     : USERNAME,
  password : PASSWORD,
  port     : PORT,
});



try {
    connection.connect(function(err) {
        if (err) {
            console.log(err)
            return connection.end()
        }

        connection.query(`CREATE DATABASE IF NOT EXISTS ${DATABASE}`, (err) => {
            if (err) {
                console.log(err)
                return connection.end()
            }
            connection.query(`USE ${DATABASE}`, (err) => {
                if (err) {
                    console.log(err)
                    return connection.end()
                }
                
                connection.query(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(
                    id INT UNSIGNED AUTO_INCREMENT,
                    name VARCHAR(40) NOT NULL,
                    time DATE NOT NULL,
                    price INT NOT NULL,
                    count INT NOT NULL,
                    prev_count INT,
                    average_cost INT NOT NULL,
                    type INT NOT NULL,
                    group INT NOT NULL,
                    ratio INT,
                    PRIMARY KEY (id)
                ) DEFAULT CHARSET=utf8`, (err) => {
                    if (err)
                        console.log(err)
                    connection.end()
                })
            })
        })
    })
} catch(e) {
    console.log(e)
}