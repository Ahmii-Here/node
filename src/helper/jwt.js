const jwt = require('jsonwebtoken');

const generateToken = (data) => {
    const token = jwt.sign({ data }, "secret", { expiresIn: '3h' })
    return token
}

const verifyJwt = (token) => {
    return jwt.verify(token, "secret")
}

module.exports = { generateToken, verifyJwt }