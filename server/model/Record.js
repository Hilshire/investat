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
        const {id, name, time, price, count, prevCount, averageCost, type, ratio, group} = r
        return this.getConnection().then((c) => {
            return wp(c, `INSERT INTO ${table}
            (id, name, time, price, count, prev_count, average_cost, type, ratio, group)
            VALUES
            (${id}, ${name}, ${time}, ${price}, ${count}, ${prevCount}, ${averageCost}, ${type}, ${ratio}, ${group})`).catch(e => console.log(e)).finally(c.release())
        }).catch((e) => console.log(e))
    }
    del(id) {
        return this.getConnection().then((c) => {
            return wp(c,`DELETE FROM ${table} WHERE id=${id}`).catch(e => console.log(e)).finally(c.release())
        }).catch(e => console.log(e))
    }
    put(r) {
        const {id, name, time, price, count, prevCount, averageCost, type, ratio, group} = r
        return this.getConnection().then((c) => {
            return wp(c, `UPDATE ${table}
            SET name=${name}, time=${time}, price=${price}, count=${count}, prev_count=${prevCount}, average_cost=${averageCost}, type=${type}, ratio=${ratio}, group=${group})
            WHERE id=${id}`).catch(e => console.log(e)).finally(c.release())
        }).catch((e) => console.log(e))
    }
    query(id) {
        return this.getConnection().then((c) => {
            return wp(c, `SELECT * from ${table} WHERE id=${id}`).catch(e => console.log(e)).finally(c.release())
        }).catch(e => console.log(e))
    }
    queryList() {
        return this.getConnection().then((c) => {
            return wp(c, `SELECT * from ${table}`).catch(e => console.log(e)).finally(c.release())
        }).catch(e => console.log(e))
    }
}

module.exports = new Record()