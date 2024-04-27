const express = require('express')
const router = express.Router()
const authRoutes = require('./auth.routes')
const booksRoutes = require('./books.routes')

router.use('/auth', authRoutes)
router.use('/book', booksRoutes)

module.exports = router;