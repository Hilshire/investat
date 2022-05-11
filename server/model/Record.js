const pool = require('./pool')

const table = process.env.TABLE

function wp(c, str) {
    return new Promise(function(resolve, reject) {
        c.query(str, function(err, result) {
            if (err) reject(err)
            resolve(result)
        })
    })
}

function handleError(e) {
    console.log(e)
    throw e
}

class Record {
    constructor() {
        this._pool = pool
    }
    getConnection() {
        const pool = this._pool
        return new Promise(function(resolve, reject) {
            pool.getConnection(function(err, connection) {
                if (err) {
                    reject(err)
                }
                resolve(connection)
            })
        })
    }
    add(r) {
        const {name, date, price, count, prevCount, averageCost, type, ratio, group} = r
        return this.getConnection().then((c) => {
            return wp(c, `INSERT INTO ${table}
            (name, date, price, count, prev_count, average_cost, type, ratio, \`group\`)
            VALUES
            ('${name}', '${date}', '${price}', '${count}', '${prevCount}', '${averageCost}', '${type}', '${ratio}', '${group}')`).catch(handleError).finally(c.release())
        }).catch(handleError)
    }
    del(id) {
        return this.getConnection().then((c) => {
            return wp(c,`DELETE FROM ${table} WHERE id=${id}`).catch(handleError).finally(c.release())
        }).catch(handleError)
    }
    put(r) {
        const {id, name, date, price, count, prevCount, averageCost, type, ratio, group} = r
        return this.getConnection().then((c) => {
            return wp(c, `UPDATE ${table}
            SET name=${name}, date=${date}, price=${price}, count=${count}, prev_count=${prevCount}, average_cost=${averageCost}, type=${type}, ratio=${ratio}, group=${group})
            WHERE id=${id}`).catch(handleError).finally(c.release())
        }).catch(handleError)
    }
    query(id) {
        return this.getConnection().then((c) => {
            return wp(c, `SELECT * from ${table} WHERE id=${id}`).catch(handleError).finally(c.release())
        }).catch(handleError)
    }
    queryList() {
        return this.getConnection().then((c) => {
            return wp(c, `SELECT * from ${table}`).catch(handleError).finally(c.release())
        }).catch(handleError)
    }
}

module.exports = new Record()