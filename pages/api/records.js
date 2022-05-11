const record = require('../../server/model/Record')

module.exports = function getRecords(req, res) {
    const { method } = req
    function handleError(e) {
        res.status(500).json({
            error: e.errno || 0
        })
    }
    switch(method) {
        case 'GET':
            record.queryList()
            .then(r => {
                res.status(200).json(r)
            }) 
            .catch(handleError)
            break
        case 'POST':
            record.add(JSON.parse(req.body))
                .then(r => {
                    res.status(200).json(r)
                })
                .catch(handleError)
            break
        case 'DELETE':
            {
                const id = req.query.id
                if (id) {
                    record.del(id)
                        .then(r => {
                            res.status(200).json(r)
                        })
                        .catch(handleError)
                } else {
                    res.status(500).json({error: 1, msg: 'need id'})
                }
                break
            }
    }
}