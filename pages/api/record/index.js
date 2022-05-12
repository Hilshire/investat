const record = require('../../../server/model/Record')
const { verifyJwt } = require('../../../common/util')

module.exports = function getRecords(req, res) {
    const { method, query: { id }, body, headers: { token } } = req

    if (!verifyJwt(token)) {
        return res.status(401).json({ errno: 2 })
    }

    if (!id) {
        return res.status(500).json({error: 1, msg: 'need id'})
    }

    function handleError(e) {
        return res.status(500).json({
            error: e.errno || 0
        })
    }
    switch(method) {
        case 'GET':
            return record.query(id)
                .then(r => {
                    res.status(200).json(r)
                }) 
                .catch(handleError)
        case 'PUT':
            return record.put(JSON.parse(body))
                .then(r => {
                    res.status(200).json(r)
                }).catch(handleError)
        case 'DELETE':
            return record.del(id)
                .then(r => {
                    res.status(200).json(r)
                })
                .catch(handleError)
    }
}