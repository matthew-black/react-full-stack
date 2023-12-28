const express = require('express')
const router = express.Router()
const pool = require('../modules/pool.cjs')
const { rejectUnauthenticated } = require('../modules/authMiddleware.cjs')

const routerPath = '/api/colors'


router.get('/', rejectUnauthenticated, (req, res) => {
  console.log(`GET ${routerPath} received a request.`)
  const sqlText = `
    SELECT * FROM "colors"
      WHERE "user_id"=$1
      ORDER BY "inserted_at";
  `
  const sqlValues = [req.session.user.id]

  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      console.log(dbRes.rows)
      res.send(dbRes.rows)
    })
    .catch((dbErr) => {
      console.log('GET /api/colors fail:', dbErr)
      res.sendStatus(500)
    })
})

router.post('/', rejectUnauthenticated, (req, res) => {
  console.log(`POST ${routerPath} received a request.`)
  console.log('\tHere is req.body:', req.body)
  const sqlText = `
    INSERT INTO "colors"
      ("name", "user_id")
      VALUES
      ($1, $2);
  `
  const sqlValues = [req.body.color, req.session.user.id]

  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      res.sendStatus(201)
    })
    .catch((dbErr) => {
      console.log('POST /api/colors fail:', dbErr)
      res.sendStatus(500)
    })
})

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  console.log(`DELETE ${routerPath}/:id received a request.`)
  const sqlText = `
    DELETE FROM "colors"
      WHERE "id"=$1 AND "user_id"=$2;
  `
  const sqlValues = [req.params.id, req.session.user.id]

  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      res.sendStatus(200)
    })
    .catch((dbErr) => {
      console.log('DELETE /api/colors/:id fail:', dbErr)
      res.sendStatus(500)
    })
})


module.exports = router
