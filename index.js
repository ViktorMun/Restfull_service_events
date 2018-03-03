const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./models')
const Sequelize = require('sequelize')

const port = process.env.PORT || 4001

const app = express()
  .use(cors())
  .use(bodyParser.json())

const { Allevents } = db

var sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres')


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  next()
})

app.use(bodyParser.json())


app.listen(port, () => {
  console.log(`
Server is listening on ${port}.

Open http://localhost:${port}

to see the app in your browser.
    `)
})
