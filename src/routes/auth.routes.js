const express = require('express')
const router = express.Router()
const errorHandler = require('../helper/errorHandler')
const auth = require('./../controller/auth')

router.post('/login', errorHandler(auth.login))
router.post('/signup', errorHandler(auth.signup))
router.post('/verify/:token', errorHandler(auth.verifyToken))

module.exports = router;