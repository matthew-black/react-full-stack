const express = require('express')
const { hash, verify } = require('../modules/password.cjs')
const pool = require('../modules/pool.cjs')

const router = express.Router()

// Be sure to think through route naming conventions
// once all of this is up and running!

// Need a route that will respond with user data about
// the currently logged-in user.

// Need a route that'll delete the requesting user's
// session. (Log out.)

// POST /api/users
// Creates a new user. AKA: Registration.
router.post('/', (req, res, next) => {
  console.log('POST /api/users received a request.')
  console.log('\tHere is req.body:', req.body)

  const { username, password } = req.body
  const passwordHash = hash(password)

  const sqlText = `
    INSERT INTO "users"
      ("username", "password")
      VALUES
      ($1, $2)
      RETURNING "id";
  `
  const sqlValues = [username, passwordHash]
  
  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      console.log('dbRes.rows[0]:', dbRes.rows[0])
      res.sendStatus(201)
    })
    .catch((dbErr) => {
      console.log('POST /api/users fail:', dbErr)
      res.sendStatus(500)
    })
})

// POST /api/users/sessions
// Creates a new session. AKA: Login.
// This route needs to:
  // 1. Verify that the sent username exists.
  // 2. Verify that the sent password is correct.
  // 3. Create a session and corresponding cookie.
  // 4. Respond with 201 and the cookie.
router.post('/sessions', async (req, res) => {
  console.log('POST /api/users/sessions received a request.')
  console.log('\tHere is req.body:', req.body)
  const { username, password } = req.body

  const sqlText = `
    SELECT * FROM "users"
      WHERE "username"=$1;
  `
  const sqlValues = [username]

  try {
    const { rows } = await pool.query(sqlText, sqlValues)
    const user = rows[0]
    if (user) {
      if (verify(password, user.password)) {
        res.send({
          woo_you_get_a: '🍪'
        })
      } else {
        res.sendStatus(401)
      }
    } else {
      res.sendStatus(401)
    }
  } catch (dbErr) {
    console.log('POST /api/users/sessions fail:', dbErr)
    res.sendStatus(500)
  }
})


module.exports = router
