const express = require("express")
const app = express()

//call model
const models = require ('../models/index')
const buku = models.buku

//penengah untuk mengizinkan reques dari body
app.use(express.urlencoded({extended:true}))

//endpoin GET
app.get("/", async (req, res)=>{
    //ambildata
    buku.findAll({
        include : [
            'rak'
        ]
    })
    .then(result => {
        res.json({
            data: result
        })
    }).catch((err) => {
        res.json({
            message: err.message
        })
    });
})

//endpoint GET by ID
app.get("/:buku_id", async (req, res) => {
    let param = { buku_id : req.params.buku_id}
    buku.findOne({where:param,include:['rak']})
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

//endpoint POST
app.post("/", async (req, res)=>{
    //tampung data
    let data = {
        rak_id : req.body.rak_id,
        judul_buku : req.body.judul_buku,
        penulis_buku : req.body.penulis_buku,
        penerbit_buku : req.body.penerbit_buku,
        tahun_penerbit : req.body.tahun_penerbit,
        stok : req.body.stok
    }
    buku.create(data)
    .then(result => {
        res.json({
            message: "data has been inserted"
        })
    })
    .catch(err => {
        res.json({
            message: err.message
        })
    })
})

//endpoint PUT
app.put("/", async (req, res) => {
    //id untuk data diubah
    let parameter = { buku_id : req.body.buku_id}
    //menampung data
    let data = {
        rak_id : req.body.rak_id,
        judul_buku : req.body.judul_buku,
        penulis_buku : req.body.penulis_buku,
        penerbit_buku : req.body.penerbit_buku,
        tahun_penerbit : req.body.tahun_penerbit,
        stok : req.body.stok
    }
    //databaru
    buku.update(data, {where:parameter})
    .then(result => {
        res.json({
            message: "data has been updated"
        })
    })
    .catch(err => {
        res.json({
            message: err.message
        })
    })
})

//endpoint DELETE by ID
app.delete("/", async (req,res)=> {
    
})


//export app
module.exports = app
