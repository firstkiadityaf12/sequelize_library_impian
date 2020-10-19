const express = require("express")
const app = express()

//call model
const models = require ('../models/index')
const anggota = models.anggota

//middleware untuk mengizinkan request melalui body
app.use(express.urlencoded({extended:true}))

//endpoint GET
app.get("/", async (req, res) => {
    //mendapatkan data
    anggota.findAll()
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

//enpoint GET by ID
app.get("/:anggota_id", async (req, res)=>{
    //mendaptkan data parameter
    let parameter = { anggota_id: req.params.anggota_id}
    anggota.findOne({where: parameter})
    .then(result => {
        res.json(result)
    })
    .catch(err => {
        res.json({
            message: err.message
        })  
    })
})

//endpoint POST
app.post("/", async (req, res) => {
    //menampung data
    let data = {
        kode_anggota : req.body.kode_anggota,
        nama_anggota : req.body.nama_anggota,
        jk_anggota : req.body.jk_anggota,
        jurusan_anggota : req.body.jurusan_anggota,
        no_telp_anggota : req.body.no_telp_anggota,
        alamat_anggota : req.body.alamat_anggota
    }
    //create data
    anggota.create(data)
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

//endpoint PUT by ID
app.put("/", async (req, res) => {
    //dapat id untuk di update
    let parameter = { anggota_id: req.body.anggota_id}

    //menampung data
    let data = {
        kode_anggota : req.body.kode_anggota,
        nama_anggota : req.body.nama_anggota,
        jk_anggota : req.body.jk_anggota,
        jurusan_anggota : req.body.jurusan_anggota,
        no_telp_anggota : req.body.no_telp_anggota,
        alamat_anggota : req.body.alamat_anggota
    }
    //update
    anggota.update(data, {where: parameter})
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

//endpoint DELETE by id
app.delete("/", async (req, res) => {
    //dapat id untuk di hapus
    let parameter = { anggota_id: req.body.anggota_id}
    //delete
    anggota.destroy({where: parameter})
    .then(result => {
        res.json({
            message: "Data has been Deleted",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//export module
module.exports = app