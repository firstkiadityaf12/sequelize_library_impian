const express = require("express")
const app = express()

// call models
const models = require ('../models/index')
const rak = models.rak

// middleware for allow the request from body
app.use(express.urlencoded({extended:true}))

//endpoint GET
app.get("/", async(req, res) => {
    //get data
    rak.findAll() 
    .then(result => {
        res.json(result)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoint GET by ID
app.get("/:rak_id", async(req, res)=>{
    let param = { rak_id:req.params.rak_id}
    rak.findOne({where:param})
    .then(result => {
        res.json({
            data: result
        })
    })
    .catch(err => {
        res.json({
            message: err.message
        })
    })
})

//endpoint POST untuk upload data
app.post("/", async(req, res) => {
    // menampung data
    let data = {
        nama_rak: req.body.nama_rak,
        loaksi_rak: req.body.loaksi_rak
    }

    rak.create(data)
    .then(result => {
        res.json({
            message: "Data has been inserted",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoint PUT untuk update data
app.put("/", async(req, res) => {
    // id untuk update
    let param = { rak_id : req.body.rak_id }
    // tampung data
    let data = {
        nama_rak: req.body.nama_rak,
        loaksi_rak: req.body.loaksi_rak
    }
    rak.update(data,{where : param})
    .then(result => {
        res.json({
            message: "Data has been Updated",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoin DELETE by ID
app.delete("/", async(req, res) => {

})

module.exports = app