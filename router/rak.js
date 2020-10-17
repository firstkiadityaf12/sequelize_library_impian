const express = require("express")
const app = express()

// call models
const models = require ('../models/index')
const rak = models.rak

//endpoint GET all
app.get("/", (req, res) => {
    rak.findAll()
    .then(result => {
        res.json(result)
    }).catch(err => {
        res.json({
            message: err.message
        })
    });
})

//endpoint GET by ID
app.get("/:rak_id", (req, res) => {
    let parameter = { rak_id = req.params.rak_id}
    rak.findOne({where: parameter})
    .then(result => {
        res.json(result)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoint POST
app.post("/", async (req, res) => {
    //menampung data
    let data = {
        nama_rak = req.body.nama_rak,
        loaksi_rak = req.body.loaksi_rak,
    }
    //proses upload
    rak.create(data)
    .then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json({
            message: err.message
        })
    });
})

//endpoint PUT by ID
app.put("/", async (req, res) => {
    
})

//endpoint DELETE by ID
app.delete("/:rak_id", async (req, res) => {

})

//export app
module.exports = app
