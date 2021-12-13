const express = require('express')
var cors = require('cors')
const { consumeQueue } = require('./consumeQueue')

const app = express()
const port = process.env.PORT || 5001

app.use(cors())
app.get('/', async(req, res) => {
  res.send("Success response Testing consumer pipeline")
})
app.get('/consumeQueue', async(req, res) => {
  let response = await consumeQueue()
  res.json({success:true, queueContent: response})
})


app.listen(port, '0.0.0.0')
