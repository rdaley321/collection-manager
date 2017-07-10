const express = require("express")
const mustache = require("mustache-express")
const bodyParser = require("body-parser")
const app = express()
const mongoose = require('mongoose')
const homepageRoutes = require("./routes/homepage")
const coinsRoutes = require("./routes/coins")

app.engine('mustache', mustache())
app.set("view engine", 'mustache')
app.set("layout", 'layout')
app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost:27017/coindb')

app.use(homepageRoutes)
app.use(coinsRoutes)

app.listen(3000, function(){
  console.log("Server is up and running!")
})
