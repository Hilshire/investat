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
        return this.getConnection().then((c) => {
            return wp(c, `INSERT INTO ${table}
                (${Object.keys(r).map(k => "`"+k+"`").join(',')})
                VALUES
                (${Object.keys(r).map(k => "'" +r[k] + "'").join(',')})
            `).catch(handleError).finally(c.release())
        }).catch(handleError)
    }
    del(id) {
        return this.getConnection().then((c) => {
            return wp(c,`DELETE FROM ${table} WHERE id=${id}`).catch(handleError).finally(c.release())
        }).catch(handleError)
    }
    put(r) {
        return this.getConnection().then((c) => {
            return wp(c, `UPDATE ${table}
            SET ${Object.keys(r).filter(k => k !== 'id').map(k => `\`${k}\`='${r[k]}'`).join(',')}
            WHERE id=${r.id}`).catch(handleError).finally(c.release())
        }).catch(handleError)
    }
    query(id) {
        return this.getConnection().then((c) => {
            return wp(c, `SELECT * from ${table} WHERE id=${id}`).catch(handleError).finally(c.release())
        }).catch(handleError)
    }
    queryList() {
        return this.getConnection().then((c) => {
            return wp(c, `SELECT * from ${table} ORDER BY date DESC`).catch(handleError).finally(c.release())
        }).catch(handleError)
    }
}

module.exports = new Record()