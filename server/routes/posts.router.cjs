const express = require('express')
const router = express.Router()
const pool = require('../modules/pool.cjs')

const routerPath = '/api/posts'


router.get('/public', (req, res) => {
  console.log(`GET ${routerPath}/public received a request.`)
  const sqlText = `
    SELECT * FROM "posts"
      WHERE "is_public"=true
      ORDER BY "inserted_at" DESC
      LIMIT 5;
  `

  pool.query(sqlText)
    .then((dbRes) => {
      res.send(dbRes.rows)
    })
    .catch((dbErr) => {
      console.log('GET /api/colors fail:', dbErr)
      res.sendStatus(500)
    })
})


module.exports = router
