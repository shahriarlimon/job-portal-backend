const express = require('express')
const { ConnectDb } = require('./Db/db')
const app = express()
const port = 5001


app.get('/', (req, res) => {
  res.send('Hello World!')
})
/* database connection */
ConnectDb()
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})