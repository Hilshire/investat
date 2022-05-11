const record = require('../../server/model/Record')
module.exports = function getRecords(req, res) {
    const { method } = req
    switch(method) {
        case 'GET':
            record.queryList()
            .then(r => {
                res.status(200).json(r)
            }) 
            .catch(e => {
                res.status(500).json({
                    error: e.errno || 0
                }) 
            })
            break
        case 'POST':
            record.add(JSON.parse(req.body))
                .then(r => {
                    res.status(200).json(r)
                })
                .catch(e => {
                    res.status(500).json({
                        error: e.errno || 0
                    })
                })
            break
    }

}