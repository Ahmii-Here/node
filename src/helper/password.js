const bcrypt = require('bcryptjs');

const encrptPassword = async function (password) {
    const passencrpt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, passencrpt)
}
const match = async function (password, m_password) {
    return await bcrypt.compare(password, m_password);
}

module.exports = { encrptPassword, match };