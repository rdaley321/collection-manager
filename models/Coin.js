const mongoose = require("mongoose");

const coinSchema = new mongoose.Schema({
  name: {type: String, required:true},
  imageUrl: {type: String, required:true},
  from: {
    country: {type: String},
    continent: {type: String}
  },
  year: {type: Number, required:true}
})

const Coin = mongoose.model('Coin', coinSchema)

module.exports = Coin
