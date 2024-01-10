const express = require('express')

const usersRouter = require('./users.router.cjs')
const postsRouter = require('./posts.router.cjs')
const commentsRouter = require('./comments.router.cjs')

const router = express.Router()

router.use('/users', usersRouter)
router.use('/posts', postsRouter)
router.use('/comments', commentsRouter)

module.exports = router
