const express = require('express')
const pool = require('../modules/pool.cjs')
const { rejectUnauthenticated } = require('../modules/authMiddleware.cjs')

const router = express.Router()


// POST /api/comments
  // Creates a new comment.
router.post('/', rejectUnauthenticated, (req, res) => {
  const sqlText = `
    INSERT INTO comments
      (text, user_id, post_id)
      VALUES
      ($1, $2, $3);
  `
  const sqlValues = [
    req.body.textContent,
    req.session.user.id,
    req.body.postId
  ]

  pool.query(sqlText, sqlValues)
    .then(() => res.sendStatus(201))
    .catch((dbErr) => {
      console.log('POST /api/comments fail:', dbErr)
      res.sendStatus(500)
    })
})


module.exports = router
