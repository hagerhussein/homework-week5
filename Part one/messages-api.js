const express = require('express')
const bodyParser = require('body-parser')
const port = 3000
const app = express()
const rateLimit = require("express-rate-limit");


app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

const createMessagesLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: "We have recieved too many messages from you"
});

app.use(createMessagesLimiter)


app.post('/messages', (req, res) => {
  if
    (req.body.text === null || req.body.text === undefined || req.body.text.length === 0) {
    res.status(400).end()
  } else {
    console.log(req.body.text)
    res.json({
      message: "We received your request body!",
    })
  }
})

app.listen(port, () => console.log("listening on port " + port))