const express = require("express")
const app = express()

// call models
const models = require ('../models/index')
const rak = models.rak

// middleware for allow the request from body
app.use(express.urlencoded({extended:true}))

app.get("/", async(req, res) => {
    rak.findAll() // get all data
    .then(result => {
        res.json(result)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.post("/", async(req, res) => {
    // menampung data
    let data = {
        nama_rak: req.body.nama_rak,
        loaksi_rak: req.body.loaksi_rak
    }

    rak.create(data)
    .then(result => {
        res.json({
            message: 'Data has been inserted',
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.put("/", async(req, res) => {
    // tampung data
    let data = {
        nama_rak: req.body.nama_rak,
        loaksi_rak: req.body.loaksi_rak
    }

    let param = { rak_id : req.body.rak_id }

    rak.update(data,{where : param})
    .then(result => {
        res.json({
            message: 'Data Updated',
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.delete("/", async(req, res) => {

})

module.exports = app