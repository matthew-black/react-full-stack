const express = require('express')
const { hash, verify } = require('../modules/password.cjs')
const pool = require('../modules/pool.cjs')

const router = express.Router()


// POST /api/users (Creates a user. AKA: Registration.)
router.post('/', (req, res) => {
  const { username, password } = req.body
  const passwordHash = hash(password)

  const sqlText = `
    INSERT INTO users
      (username, password)
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

// GET /api/users/sessions (Responds with current session.user object or {})
router.get('/sessions', (req, res) => {
  res.send(req.session.user || {})
})

// POST /api/users/sessions (Creates a new session. AKA: Login.)
router.post('/sessions', async (req, res) => {
  const { username, password } = req.body

  const sqlText = `
    SELECT * FROM users
      WHERE username=$1;
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
            console.log('regenErr in POST /api/users/sessions:', regenErr)
            res.sendStatus(500)
          }

          // Create the session.user object:
          // 🔥 This is where we need to store any user metadata that we
          //    want accessible:
          //      * Server-side: via req.session.user
          //      * Client-side: via the useAuthContext hook's user state
          req.session.user = {
            id: user.id,
            username: user.username,
          }

          // Save the session:
          req.session.save((saveErr) => {
            if (saveErr) {
              console.log('saveErr in POST /api/users/sessions:', saveErr)
              res.sendStatus(500)
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

// DELETE /api/users/sessions (Deletes the current session. AKA: Logout.)
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
