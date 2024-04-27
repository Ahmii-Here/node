const { signupSchema, signinSchema } = require('../validation/auth')
const { encrptPassword, match } = require('../helper/password')
const OTP = require('otp')
const prisma = require('../db')
const sendEmail = require('../helper/email')
const { generateToken, verify, verifyJwt } = require('../helper/jwt')

class Auth {

    async login(req, res) {
        const { email, password } = signinSchema.parse(req.body)
        const user = await prisma.user.findFirst({ where: { email } })
        if (!user) throw new Error("User Not Found")
        if (!match(password, user.password))
        throw new Error("Invalid credintails")
        let token = generateToken(user)
        res.send({ token })
    }

    async signup(req, res) {
        const data = signupSchema.parse(req.body)
        const user = await prisma.user.findFirst({ where: { email: data.email } })
        if (user) throw new Error("User already exists")
        data.password = await encrptPassword(data.password)
        const otp = new OTP({ codeLength: 6 });
        data.otp = otp.totp()
        const obj = await prisma.user.create({ data })
        if (obj) {
            await sendEmail(obj.email, 'OTP', `${obj.otp}`)
        }
        res.send({ status: "Success" })
    }

    async verifyToken(req, res) {
        const { token } = req.params
        let { data } = verifyJwt(token)
        res.send({ status: "Success", data })
    }
}

module.exports = new Auth()