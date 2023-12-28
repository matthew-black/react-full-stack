const express = require('express')
const sessionMiddleware = require('./modules/session.cjs')
const apiRouter = require('./routes/_api.router.cjs')

const app = express()
const port = 5001

app.use(express.json())
app.use(express.static('dist'))
app.use(sessionMiddleware)
app.use('/api', apiRouter)

app.listen(port, () => {
  console.log(`server running http://localhost:${port}`)
})
