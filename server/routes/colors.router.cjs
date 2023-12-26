const express = require('express')
const router = express.Router()
const pool = require('../modules/pool.cjs')

const routerPath = '/api/colors'

router.get('/', (req, res) => {
  console.log(`GET ${routerPath} received a request.`)
  const sqlText = `
    SELECT * FROM "colors"
      ORDER BY "inserted_at";
  `

  pool.query(sqlText)
    .then((dbRes) => {
      console.log(dbRes.rows)
      res.send(dbRes.rows)
    })
    .catch((dbErr) => {
      console.log('GET /api/colors fail:', dbErr)
      res.sendStatus(500)
    })
})

router.post('/', (req, res) => {
  console.log(`POST ${routerPath} received a request.`)
  console.log('\tHere is req.body:', req.body)
  const sqlText = `
    INSERT INTO "colors"
      ("name")
      VALUES
      ($1);
  `
  const sqlValues = [req.body.color]

  pool.query(sqlText, sqlValues)
  .then((dbRes) => {
    res.sendStatus(201)
  })
  .catch((dbErr) => {
    console.log('POST /api/colors fail:', dbErr)
    res.sendStatus(500)
  })
})

module.exports = router
