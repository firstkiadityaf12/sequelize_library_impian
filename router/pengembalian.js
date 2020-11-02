const express = require ("express")
const app = express()

//call model
const models = require('../models/index')
//panggil
const pengembalian = models.pengembalian
const buku = models.buku

//middleware req melalui body
app.use(express.urlencoded({extended: true}))

//endpoint GET
app.get("/", async (req, res) => {
    //ambil data
    let data = await pengembalian.findAll({
        include : [ 
            "petugas","anggota",
            {
                model: models.buku,
                as: "buku",
                include: ["rak"]
            }
        ]
    })
    res.json({
        data: data
    })
})

//endpoint get by id
app.get("/:pengembalian_id", async (req,res)=>{
    //ambil dtaa
    let parameter = {pengembalian_id: req.params.peminjaman_id}
    let data = await pengembalian.findOne({
        where: parameter,
        include: [
            "petugas","anggota",
            {
                model: models.buku,
                as: "buku",
                include: ["rak"]
            }
        ]
    })
    res.json({
        data: data
    })
})

//endpoint post
app.post("/", async (req, res) => {
    //menampung data
    let data = {
        tanggal_pengembalian: req.body.tanggal_pengembalian,
        denda: req.body.denda,
        buku_id: req.body.buku_id,
        anggota_id: req.body.anggota_id,
        petugas_id: req.body.petugas_id
    }
    pengembalian.create(data)
    //menambah buku atau mengurangi peminjaman
    const kembali = await buku.findOne({where: {buku_id: data.buku_id}})
    let tambah = {
        stok: kembali.stok + 1
    }
    //update
    buku.update(tambah, {where: {buku_id: data.buku_id}})
    .then(result => {
        res.json({
            message: "data inserted",
            result: data
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoint put
app.put("/", async (req, res) => {
    //menampung data
    let data = {
        tanggal_pengembalian: req.body.tanggal_pengembalian,
        denda: req.body.denda,
        buku_id: req.body.buku_id,
        anggota_id: req.body.anggota_id,
        petugas_id: req.body.petugas_id
    }
    //parameter pengembalian
    let parameter = { pengembalian_id: req.body.pengembalian_id}
    //update data pengembalian
    pengembalian.update(data, {where: parameter})
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

//endpoint delete
app.delete("/:pengembalian_id", async (req, res) => {
    let parameter = { pengembalian_id: req.params.pengembalian_id}
    try{
        //tambah data peminjaman
        let kembali = await pengembalian.findOne({where: parameter})
        let stokbuku = await buku.findOne({where: {buku_id: pinjam.buku_id}})
        // tambah stok buku
        let isi = {
            stok: stokbuku.stok - 1
        }
        //update
        buku.update(isi, { where: {buku_id: kembali.buku_id}})
        //delete pengembalian
        pengembalian.destroy({where: parameter})
        .then(result => {
            res.json({
                message: "Data has been delete",
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    }
    catch(error){
        res.json({
            message: error.message
        })
    }
})

//export module
module.exports = app