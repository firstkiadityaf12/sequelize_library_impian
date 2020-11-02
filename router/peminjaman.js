const express = require ("express")
const app = express()

//cal model
const models = require ('../models/index')
//memanggil yang dibutuhkan
const peminjaman = models.peminjaman
const pengembalian = models.pengembalian
const buku = models.buku 

//middleware untuk mengizinkan req melalui body
app.use(express.urlencoded({extended: true}))

//endpoint GET
app.get("/", async (req, res) => {
    //ambil data
    let data = await peminjaman.findAll({
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

//endpoint GET by Id
app.get("/:peminjaman_id", async (req, res) => {
    //ambil data
    let param = { peminjaman_id : req.params.peminjaman_id }
    let data = await peminjaman.findOne({
        where: param,
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

//endpoint POST
app.post("/", async (req, res) => {
    
    //tampung data peminjaman
    let data = {
        tanggal_pinjam : req.body.tanggal_pinjam,
        tanggal_kembali : req.body.tanggal_kembali,
        buku_id : req.body.buku_id,
        anggota_id : req.body.anggota_id,
        petugas_id : req.body.petugas_id
    }

    //proses upload data peminjaman
    peminjaman.create(data)

    //mengurangi stok buku
    const pinjam = await buku.findOne({where: {buku_id: data.buku_id}})
    let kurang = {
        stok : pinjam.stok - 1
    }
    //update
    buku.update(kurang, {where: {buku_id: data.buku_id}})
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

//endpoint PUT
app.put("/", async (req, res) => {

    //tampung data peminjaman
    let data = {
        tanggal_pinjam : req.body.tanggal_pinjam,
        tanggal_kembali : req.body.tanggal_kembali,
        buku_id : req.body.buku_id,
        anggota_id : req.body.anggota_id,
        petugas_id : req.body.petugas_id
    }

    //parameter
    let param = { peminjaman_id: req.body.peminjaman}

    //update data
    peminjaman.update(data, {where: param})
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

//endpoin delete
app.delete("/:peminjaman_id", async (req, res) => {
    let parameter = { peminjaman_id: req.params.peminjaman_id}

    try{
        //tampung data peminjaman
        let pinjam = await peminjaman.findOne({where: parameter})
        let stokbuku = await buku.findOne({where: {buku_id: pinjam.buku_id}})
        //tambhakna stok buku
        let isi = {
            stok: stokbuku.stok + 1
        }

        //update
        buku.update(isi, { where: {buku_id: pinjam.buku_id}})
        //delete peminjaman
        peminjaman.destroy({where: parameter})
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