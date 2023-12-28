const express = require('express')

const usersRouter = require('./users.router.cjs')
const colorsRouter = require('./colors.router.cjs')

const router = express.Router()

router.use('/users', usersRouter)
router.use('/colors', colorsRouter)

module.exports = router
