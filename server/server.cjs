const express = require('express')

// 🍪🍪 Refactor this into a sessionHelpers module: 🍪🍪 TODO
const session = require('express-session')
const MemoryStore = require('memorystore')(session)

// 🚀🚀 Refactor this into a single api.cjs import: 🚀🚀 TODO
const usersRouter = require('./routes/users.router.cjs')
const colorsRouter = require('./routes/colors.router.cjs')

const app = express()
const port = 5001

app.use(express.json())
app.use(express.static('dist'))

// 🍪🍪 Refactor this into a module: 🍪🍪 TODO
app.use(session({
  cookie: { 
    maxAge: 6 * 60 * 60 * 1000, // 6h
    sameSite: true,
    httpOnly: true,
    secure: false // if true, cookie must be sent via HTTPS
  },
  store: new MemoryStore({
    checkPeriod: 6 * 60 * 60 * 1000 // prune expired entries every 6h
  }),
  resave: false,
  saveUninitialized: true, // https://expressjs.com/en/resources/middleware/session.html#:~:text=for%20the%20request.-,saveUninitialized,-Forces%20a%20session
  secret: 'this is where something secret would go...'
}))

// 🚀🚀 Refactor into a single app.use('/api', api): 🚀🚀 TODO
app.use('/api/colors', colorsRouter)
app.use('/api/users', usersRouter)

app.listen(port, () => {
  console.log(`server running http://localhost:${port}`)
})
