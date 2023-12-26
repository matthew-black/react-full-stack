const express = require('express')
const app = express()
const port = 5001

const colors = ['red', 'yellow', 'blue']

app.use(express.json())

app.use(express.static('dist/'))

app.get('/api/colors', (req, res) => {
  res.send(colors)
})

app.post('/api/colors', (req, res) => {
  colors.push(req.body.color)
  res.sendStatus(201)
})

app.listen(port, () => {
  console.log(`server running http://localhost:${port}`)
})
