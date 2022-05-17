const record = require('../../server/model/Record')
const { verifyJwt, formatData } = require('../../common/util')

module.exports = function getRecords(req, res) {
    const { method, headers: { token } } = req

    if (!verifyJwt(token)) {
        return res.status(401).json({ errno: 2 })
    }

    function handleError(e) {
        return res.status(500).json({
            error: e.errno || 0
        })
    }
    switch(method) {
        case 'GET':
            return record.queryList()
            .then(r => {
                res.status(200).json(r)
            }) 
            .catch(handleError)
        case 'POST':
            return record.add(formatData(JSON.parse(req.body)))
                .then(r => {
                    res.status(200).json(r)
                })
                .catch(handleError)
        case 'DELETE':
            {
                const id = req.query.id
                if (id) {
                    return record.del(id)
                        .then(r => {
                            res.status(200).json(r)
                        })
                        .catch(handleError)
                } else {
                    return res.status(500).json({error: 1, msg: 'need id'})
                }
            }
    }
}