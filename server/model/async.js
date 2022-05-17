var mysql = require('mysql');

const {
    HOST='localhost',
    DATABASE='db',
    PORT=3306,
    USERNAME="me",
    PASSWORD="secret",
    TABLE="table"
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
                
                connection.query(`CREATE TABLE IF NOT EXISTS \`${TABLE}\`(
                    \`id\` INT UNSIGNED AUTO_INCREMENT,
                    \`name\` VARCHAR(40) NOT NULL,
                    \`date\` DATE NOT NULL,
                    \`price\` INT NOT NULL, # 购买单价
                    \`count\` INT NOT NULL, # 购买数量
                    \`prev_count\` INT,     # 买后持仓 TODO: 修改字段名
                    \`average_cost\` INT,   # 购买后平均成本
                    \`type\` INT NOT NULL,  # 类型,1货币基金,2债券基金,3指数基金,4股票
                    \`group\` INT NOT NULL, # 分组,1定投计划,2股市计划,3ETF拯救世界
                    \`ratio\` INT,          # 买后利润率
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