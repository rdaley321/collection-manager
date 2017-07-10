const express = require("express")
const router = express.Router()
const Coin = require("../models/Coin")

var coin = new Coin({name: 'Buffalo Head Nickel', imageUrl: 'http://www.usacoinbook.com/us-coins/buffalo-nickel-mound-type.jpg', year: 1915})

router.get('/', function(req, res) {
  Coin.find().sort('year').then(function(coins, from) {
    res.render('homepage', {
      coins: coins,
      from: from
    })
  })
})

router.post('/add', function(req, res) {
  console.log(req.body)
  const coin = new Coin()
  coin.name = req.body.name
  coin.from = {country: req.body.country, continent: req.body.continent}
  coin.imageUrl = req.body.imageUrl
  coin.year = req.body.year
  coin.save().then(function(coin) {
    console.log(coin)
    res.redirect('/')
  }).catch(function(validationError, coins, from) {
    console.log(validationError)
    res.render('homepage', {
      coins: coins,
      from: from,
      validationError: validationError
    })
  })
})

router.post('/delete', function(req,res) {
  console.log("Deleting _id:" , req.body.id)
  Coin.deleteOne({'_id': req.body.id}).then(function(coin) {
    res.redirect('/')
  }).catch(function(error) {
    console.log('ERROR DELETING')
  })
})

module.exports = router
