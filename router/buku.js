const express = require("express")
const app = express()

//call model
const models = require ('../models/index')
const buku = models.buku

//endpoin GET
app.get("/", (req, res) => {
    buku.findAll()
    .then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json({
            message: err.message
        })
    });
})

//endpoint GET by ID
app.get("/:buku_id", (req, res) => {
    let param = req.params.buku_id
    buku.findOne({where: param})
    .then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json({
            message: err.message
        })
    });
})

//endpoint POST
app.post("/", async (req, res) => {
    //menampung id
    let data = {
        rak_id = req.body.rak_id,
        judul_buku = req.body.judul_buku,
        penulis_buku = req.body.penulis_buku,
        penerbit_buku = req.body.penerbit_buku,
        tahun_penerbit = req.body.tahun_penerbit,
        stok = req.body.stok
    }
    //mengupload data
    buku.create(data)
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
