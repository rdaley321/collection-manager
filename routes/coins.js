const express = require("express")
const router = express.Router()
const Coin = require("../models/Coin")

router.get('/coins/:id', function(req, res) {
  Coin.findOne({'_id': req.params.id}).then(function(coin,from) {
    console.log(coin)
    res.render('./coins/edit', {
      coin: coin,
    })
  })
})

router.post('/coins/:id', function(req, res) {
  Coin.findOne({'_id': req.params.id}).then(function(coin) {
    coin.name = req.body.name
    coin.from = {country: req.body.country, continent: req.body.continent}
    coin.imageUrl = req.body.imageUrl
    coin.year = req.body.year
    coin.save().then(function() {
      res.redirect('/coins/' + req.params.id)
    }).catch(function(validationError, coin, from) {
      res.render('./coins/edit', {
        coin: coin,
        from: from,
        validationError: validationError
      })
    })
  })
})

module.exports = router
