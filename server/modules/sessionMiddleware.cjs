const session = require('express-session')
const MemoryStore = require('memorystore')(session)


const sessionMiddleware = session({
  cookie: { 
    maxAge: 6 * 60 * 60 * 1000, // 6h
    httpOnly: true,
    secure: false // if true, cookie must be sent via HTTPS
  },
  store: new MemoryStore({
    checkPeriod: 6 * 60 * 60 * 1000 // prune expired entries every 6h
  }),
  resave: false,
  saveUninitialized: true, // https://expressjs.com/en/resources/middleware/session.html#:~:text=for%20the%20request.-,saveUninitialized,-Forces%20a%20session
  secret: 'this is where something secret would go...'
})


module.exports = sessionMiddleware
