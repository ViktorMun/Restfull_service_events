const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./models')
const Sequelize = require('sequelize')

const port = process.env.PORT || 4444

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


//Find all events
app.get('/allevents', (req, res) => {
  const allevents = Allevents
    .findAll()
    .then((allevents) => {
      res.json(allevents)
    })
    .catch((err) => {
      console.error(err)
      res.status(500)
      res.json({ message: 'Oops! There was an error getting the events. Please try again' })
    })
})

//Find event by id
app.get('/allevents/:id', (req, res) => {

  const allevents = Allevents
    .findById(req.params.id)

    .then((Allevents) => {
      if (Allevents) {
        res.json(Allevents)
      } else {
        res.status(404)
        res.json({ message: 'product not found!' })
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500)
      res.json({ message: 'Oops! There was an error getting the event. Please try again' })
    })
})




app.listen(port, () => {
  console.log(`
Server is listening on ${port}.

Open http://localhost:${port}

to see the app in your browser.
    `)
})
