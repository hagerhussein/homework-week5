const express = require('express')
const bodyParser = require('body-parser')
const moviesRouter = require('./routes')

const app = express()
const port = process.env.PORT || 3000

app
  .use(bodyParser.json())
  .use(moviesRouter)
  .listen(port, () => console.log(`Listening on port ${port}`))