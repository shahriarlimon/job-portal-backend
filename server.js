const express = require('express')
const cors = require('cors');
const { ConnectDb } = require('./Db/db')
const app = express()
const port = 4000;
const apiRoutes = require('./routes/apiRoutes')
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api/v1', apiRoutes)
/* database connection */
ConnectDb()
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})