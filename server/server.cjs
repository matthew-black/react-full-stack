const express = require('express')
const colorsRouter = require('./routes/colors.router.cjs')
const usersRouter = require('./routes/users.router.cjs')

const app = express()

const port = 5001

const colors = ['red', 'yellow', 'blue']

app.use(express.json())
app.use(express.static('dist'))

app.use('/api/colors', colorsRouter)
app.use('/api/users', usersRouter)


app.listen(port, () => {
  console.log(`server running http://localhost:${port}`)
})
