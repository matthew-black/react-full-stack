const express = require('express')
const router = express.Router()
const pool = require('../modules/pool.cjs')
const { rejectUnauthenticated } = require('../modules/authMiddleware.cjs')

const routerPath = '/api/posts'


router.get('/public', (req, res) => {
  const sqlText = `
    SELECT
      posts.*,
      users.username
    FROM posts
    JOIN users
      ON posts.user_id=users.id
    WHERE
      is_public=true
    ORDER BY
      inserted_at DESC
    LIMIT 5;
  `

  pool.query(sqlText)
    .then((dbRes) => {
      res.send(dbRes.rows)
    })
    .catch((dbErr) => {
      console.log('GET /api/posts/public fail:', dbErr)
      res.sendStatus(500)
    })
})

router.get('/', rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT
      posts.*,
      users.username
    FROM posts
    JOIN users
      ON posts.user_id=users.id
    WHERE
      posts.user_id=$1
    ORDER BY
      inserted_at DESC;
  `
  const sqlValues = [req.session.user.id]
  pool.query(sqlText, sqlValues)
  .then((dbRes) => {

    res.send(dbRes.rows)
  })
  .catch((dbErr) => {
    console.log('GET /api/posts fail:', dbErr)
    res.sendStatus(500)
  })
})


module.exports = router
