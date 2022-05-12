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
export {
    getToken,
    verifyJwt
}