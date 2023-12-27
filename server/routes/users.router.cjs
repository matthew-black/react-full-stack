const express = require('express')
const { hash, verify } = require('../modules/password.cjs')
const pool = require('../modules/pool.cjs')

const router = express.Router()

// Be sure to think through route naming conventions
// once all of this is up and running! TODO

// Need a route that can tell the client if the current
// user has an active session.
// GET /api/users/sessions
  // Responds with the current session.user object || {}
router.get('/sessions', (req, res) => {
  res.send(req.session.user || {})
})



// POST /api/users
  // Creates a new user. AKA: Registration.
router.post('/', (req, res) => {
  console.log('POST /api/users received a request.')
  console.log('\tHere is req.body:', req.body)

  const { username, password } = req.body
  const passwordHash = hash(password)

  const sqlText = `
    INSERT INTO "users"
      ("username", "password")
      VALUES
      ($1, $2);
  `
  const sqlValues = [username, passwordHash]
  
  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      res.sendStatus(201)
    })
    .catch((dbErr) => {
      console.log('POST /api/users fail:', dbErr)
      res.sendStatus(500)
    })
})

// POST /api/users/sessions
  // Creates a new session. AKA: Login.
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
    const dbRes = await pool.query(sqlText, sqlValues)
    const user = dbRes.rows[0]
    
    if (user) {
      if (verify(password, user.password)) {
        // regenerate the session, which is good practice to help
        // guard against forms of session fixation
        req.session.regenerate((regenErr) => {
          if (regenErr) {
            next(regenErr) // TODO get rid of these next calls and send back 500 instead.
          }

          // Create the session.user object:
          req.session.user = {
            id: user.id,
            username: user.username,
          }

          // Save the session:
          req.session.save((saveErr) => {
            if (saveErr) {
              return next(saveErr)
            }
            // Tell client that the session has been created:
            res.sendStatus(201)
          })
        })
      } else {
        // Invalid credentials!
        res.sendStatus(401)
      }
    } else {
      // Invalid credentials!
      res.sendStatus(401)
    }
  } catch (dbErr) {
    console.log('POST /api/users/sessions fail:', dbErr)
    res.sendStatus(500)
  }
})

// DELETE /api/users/sessions
  // Deletes the current session. AKA: Logout.
router.delete('/sessions', (req, res) => {
  req.session.user = null

  req.session.save((saveErr) => {
    if (saveErr) {
      console.log('session save error:', saveErr)
      res.sendStatus(500)
    }

    req.session.regenerate((regenErr) => {
      if (regenErr) {
        console.log('session regen error:', regenErr)
        res.sendStatus(500)
      }
      // Tell client session was successfully deleted:
      res.sendStatus(200)
    })
  })
})


module.exports = router
