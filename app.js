const express = require('express')
var cors = require('cors')
const { consumeQueue } = require('./consumeQueue')

const app = express()
const port = 5001

app.use(cors())
app.get('/', async(req, res) => {
  res.send("Success response")
})
app.get('/consumeQueue', async(req, res) => {
  let response = await consumeQueue()
  res.json({success:true, queueContent: response})
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
