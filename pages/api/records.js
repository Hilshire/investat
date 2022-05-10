const record = require('../../server/model/Record')
module.exports = function getRecords(req, res) {
   record.queryList()
    .then(r => {
        res.status(200).json(r)
    }) 
    .catch(e => {
       res.status(500).json({
           error: e.errno
       }) 
    })
}