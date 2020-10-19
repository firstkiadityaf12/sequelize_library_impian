const express = require("express")
const app = express()

//call model
const models = require ('../models/index')
const petugas = models.petugas 

//middleware untuk mengizinkan request melalui body
app.use(express.urlencoded({extended:true}))

//endpoint GET
app.get("/", async (req, res) => {
    //mendapatkan data
    petugas.findAll()
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
app.get("/:petugas_id", async (req, res)=>{
    //mendaptkan data parameter
    let parameter = { petugas_id: req.params.petugas_id}
    petugas.findOne({where: parameter})
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
        nama_petugas : req.body.nama_petugas,
        jabatan_petugas : req.body.jabatan_petugas,
        no_telp_petugas : req.body.no_telp_petugas,
        alamat_petugas : req.body.alamat_petugas
    }
    //create data
    petugas.create(data)
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
    let parameter = { petugas_id: req.body.petugas_id}

    //menampung data
    let data = {
        nama_petugas : req.body.nama_petugas,
        jabatan_petugas : req.body.jabatan_petugas,
        no_telp_petugas : req.body.no_telp_petugas,
        alamat_petugas : req.body.alamat_petugas
    }
    //update
    petugas.update(data, {where: parameter})
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
    let parameter = { petugas_id: req.body.petugas_id}
    //delete
    petugas.destroy({where: parameter})
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