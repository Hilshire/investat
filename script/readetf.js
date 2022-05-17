const { readFileSync } = require('fs')
const { join } = require('path')
require('dotenv').config()

const filePath = join(__dirname, './etfs.csv')
const token = process.env.TOKEN || ''
const host = 'http://localhost:3000/'
// {name, date, price, count, prev_count, average_cost, type, ratio, group, id}

try {
    (async function() {
        const etfs = readFileSync(filePath).toString()
        let rows = etfs.split(/\r\n|\n/)
        rows.shift()
        rows = rows.map(
            row => {
                const [time, name, count, average, cost, empty, positionAver, positionCount, positionCost, ratio=null] = row.split(',')
                if (!time)
                    return
                const rst = {
                    name,
                    date: new Date(time),
                    price: Math.round(average * 10000),
                    count,
                    average_cost: Math.round(positionAver * 10000),
                    //cost: cost || count * average,
                    prev_count: Math.round(positionCount),
                    ratio,
                    type: 3,
                    group: 2
                }
                Object.keys(rst).forEach(k => {
                    if (!rst[k]) delete rst[k]
                })
                return rst
            }
        ).filter(i => i)
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