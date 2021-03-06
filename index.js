const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const port = process.env.PORT || 4444

const app = express()
  .use(cors())
  .use(bodyParser.json())

const {
  Allevents
} = db

var sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres')


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  next()
})

app.use(bodyParser.json())
console.log(new Date())


//Find all events
app.get('/allevents', (req, res) => {
  const allevents = Allevents
    .findAll({
      attributes: ['title', 'startdate', 'enddate'],
      where: {
        startdate: {
          [Op.gt]: new Date()
        }
      }
    })
    .then((allevents) => {
      res.json(allevents);
    })
    .catch((err) => {
      console.error(err)
      res.status(500)
      res.json({
        message: 'Oops! There was an error getting the events. Please try again'
      })
    })
})

//Find event by id
app.get('/allevents/:id', (req, res) => {
  const oneevent = Allevents
    .findById(req.params.id)
    .then((Allevents) => {
      if (Allevents) {
        res.json(Allevents)
      } else {
        res.status(404)
        res.json({
          message: 'Event not found!'
        })
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500)
      res.json({
        message: 'Oops! There was an error getting the event. Please try again'
      })
    })
})

// Create event
app.post('/allevents', (req, res) => {
  var nowDate = new Date();
  var date = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
  console.log(date)
  console.log(req.body.startdate)
  const newevent = req.body
  if (req.body.startdate > req.body.enddate)
    return console.log('Start date should not be before the end date')
  if (date > req.body.startdate)
    return console.log('Start date should not be before current date')
  else
    Allevents.create(newevent)
    .then(entity => {
      res.status(201)
      res.json(entity)
    })
    .catch(err => {
      res.status(422)
      res.json({
        message: err.message
      })
    })
})


//change event
app.put('/allevents/:id', (req, res) => {
  const eventId = Number(req.params.id)
  const updates = req.body

  Allevents.findById(req.params.id)
    .then(entity => {
      return entity.update(updates)
    })
    .then(final => {
      res.json(final)
    })
    .catch(error => {
      res.status(500).send({
        message: `Something went wrong`,
        error
      })
    })
})

//delete event
app.delete('/allevents/:id', (req, res) => {
  Allevents.findById(req.params.id)
    .then(entity => {
      return entity.destroy()
    })
    .then(_ => {
      res.send({
        message: 'The event was deleted succesfully'
      })
    })
    .catch(error => {
      res.status(500).send({
        message: `Something went wrong`,
        error
      })
    })
})


app.listen(port, () => {
  console.log(`
Server is listening on ${port}.

Open http://localhost:${port}

to see the app in your browser.
    `)
})
