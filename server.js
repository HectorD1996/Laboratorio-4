const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://HectorD:contrasena1@ds251245.mlab.com:51245/pizzas', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('pizza').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {quotes: result})
  })
})

app.post('/pizza', (req, res) => {
  db.collection('pizza').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/pizza', (req, res) => {
  db.collection('pizza')
  .findOneAndUpdate({name: req.body.name}, {
    $set: {
      name: req.body.name,
      Descripcion: req.body.Descripcion,
      Ingredientes: req.body.Ingredientes,
      Masa: req.body.Masa,
      Tamaño: req.body.Tamaño,
      Porciones: req.body.Porciones,
      queso: req.body.queso
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/pizza', (req, res) => {
  db.collection('pizza').findOneAndDelete({name: req.body.name}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Orden Eleminada')
  })
})
