const record = require('../../../server/model/Record')

module.exports = function getRecords(req, res) {
    const { method, query: { id } } = req
    if (!id) {
        res.status(500).json({error: 1, msg: 'need id'})
    }

    function handleError(e) {
        res.status(500).json({
            error: e.errno || 0
        })
    }
    switch(method) {
        case 'GET':
            record.query(id)
                .then(r => {
                    res.status(200).json(r)
                }) 
                .catch(handleError)
            break
        case 'DELETE':
            record.del(id)
                .then(r => {
                    res.status(200).json(r)
                })
                .catch(handleError)
            break
    }
}