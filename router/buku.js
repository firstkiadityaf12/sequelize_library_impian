const express = require("express")
const app = express()

//call model
const models = require ('../models/index')
const buku = models.buku


//export app
module.exports = app
