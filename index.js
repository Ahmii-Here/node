require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routes = require('./src/routes/index.routes')
const port = process.env.PORT


app.use(bodyParser.json())
app.use("/api", routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})