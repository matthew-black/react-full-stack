const express = require('express')
const pool = require('../modules/pool.cjs')
const { rejectUnauthenticated } = require('../modules/authMiddleware.cjs')

const router = express.Router()

// GET /api/posts/public
  // Responds with the five most recent public posts.
router.get('/public', (req, res) => {
  const sqlText = `
    SELECT
      posts.*,
      users.username
    FROM posts
    INNER JOIN users
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

// GET /api/posts
  // Responds with all of a logged-in user's posts.
router.get('/', rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT
      posts.*,
      users.username
    FROM posts
    INNER JOIN users
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

// GET /api/posts/:id
  // Responds with a single post, along with its comments.
router.get('/:id', (req, res) => {
  if (isNaN(Number(req.params.id))) {
    res.sendStatus(400)
    return
  }

  const sqlText = `
    SELECT
      posts.*,
      users.username,
      comments_with_usernames.*
    FROM posts
    INNER JOIN users
      ON posts.user_id=users.id
    LEFT JOIN 
          (SELECT
              comments.id AS comment_id,
              comments.text AS comment_text,
              comments.inserted_at AS comment_inserted_at,
              comments.post_id,
              users.username AS comment_username
            FROM comments
            INNER JOIN users
              ON comments.user_id=users.id
            WHERE
              comments.post_id=$1 )
          AS comments_with_usernames
      ON posts.id=comments_with_usernames.post_id
    WHERE
      (posts.id=$1 AND posts.is_public=true)
      OR
      (posts.id=$1 AND posts.user_id=$2)
    ORDER BY
      comments_with_usernames.comment_inserted_at ASC;
  `
  const sqlValues = [req.params.id, req.session.user?.id]

  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      if (!dbRes.rows[0]) {
        res.sendStatus(400)
        return
      }
      const { id, title, text, is_public, username, inserted_at, updated_at } = dbRes.rows[0]
      
      const post = { id, title, text, is_public, username, inserted_at, updated_at }
      
      if (dbRes.rows[0].comment_id) {
        // If there are associated comments, post.comments is an array of comment objects:
        post.comments = dbRes.rows.map((row) => (
          {
            id: row.comment_id,
            text: row.comment_text,
            username: row.comment_username,
            inserted_at: row.comment_inserted_at
          }
        ))
      } else {
        // Else, post.comments is empty array:
        post.comments = []
      }
      
      console.log('post is:', post)
      res.send(post)
    })
    .catch((dbErr) => {
      console.log('GET /api/posts/:id fail', dbErr)
      res.sendStatus(500)
    })
})

// POST /api/posts
  // Creates a new post.
router.post('/', rejectUnauthenticated, (req, res) => {
  const sqlText = `
    INSERT INTO posts
      (title, text, user_id)
      VALUES
      ($1, $2, $3)
      RETURNING id;
  `
  const sqlValues = [
    req.body.title,
    req.body.textContent,
    req.session.user.id
  ]
  pool.query(sqlText, sqlValues)
  .then((dbRes) => {
    res.status(201).send(dbRes.rows[0])
  })
  .catch((dbErr) => {
    console.log('POST /api/posts fail:', dbErr)
    res.sendStatus(500)
  })
})


module.exports = router
