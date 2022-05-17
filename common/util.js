import jsonwebtoken from "jsonwebtoken"

function getToken() {
    return localStorage.getItem('token')
}
function verifyJwt(token) {
    try {
        jsonwebtoken.verify(token, 'I WANT TO BUY A T-SHIRT')
        return true
    } catch(e) {
        console.log(e)
        return false
    }
}
function formatDate(d) {
    if (!(d instanceof Date)) {
        d = new Date(d)
    }
    return d.toJSON().split('T')[0]
}
function formatData(data) {
    if (data.date) {
        data.date = formatDate(data.date)
    }
    return data
}
export {
    getToken,
    verifyJwt,
    formatData
}