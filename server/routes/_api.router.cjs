const express = require('express')

const usersRouter = require('./users.router.cjs')
const postsRouter = require('./posts.router.cjs')

const router = express.Router()

router.use('/users', usersRouter)
router.use('/posts', postsRouter)

module.exports = router
