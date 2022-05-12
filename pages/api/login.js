let jwt = require('jsonwebtoken')
module.exports = function login (req, res) {
    const key = req.body
    if (key !== process.env.ADMIN) {
        return res.status(401).json({ errno: 1 })
    }
    const token = jwt.sign({}, 'I WANT TO BUY A T-SHIRT', {
        expiresIn: "1h",
    })
    res.status(200).json({ token })
}