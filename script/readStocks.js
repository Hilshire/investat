const { readFileSync } = require('fs')
const { join } = require('path')
require('dotenv').config()

const filePath = join(__dirname, './stocks.csv')
const token = process.env.TOKEN
const host = 'http://localhost:3000/'
// {name, date, price, count, prev_count, average_cost, type, ratio, group, id}

try {
    (async function(){
        const stocks = readFileSync(filePath).toString()
        let rows = stocks.split(/\r\n|\n/)
        rows.shift()
        rows = rows.map(
            row => {
                const [time, name, average, count, cost,
                    positionAver, positionCount] = row.split(',')
                const rst = {
                    name,
                    date: new Date(time),
                    price: Math.round(average * 10000),
                    count,
                    average_cost: Math.round(positionAver * 10000),
                    //cost: cost || count * average,
                    prev_count: positionCount,
                    type: 4,
                    group: 2
                }
                Object.keys(rst).forEach(k => {
                    if (!rst[k]) delete rst[k]
                })
                return rst
            }
        )
        for (let i=0;i<rows.length;i++) {
            await fetch(join(host,'/api/records'), {
                method: 'post',
                headers: {token},
                body: JSON.stringify(rows[i])
            }) 
        }
    })()
} catch(e) {
    console.error(e)
}