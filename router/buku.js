const express = require("express")
const app = express()

//call model
const models = require ('../models/index')
const buku = models.buku

//library upload file
const multer = require("multer")
const path = require("path") //manage file directory file
const fs = require("fs") //manage file

//penengah untuk mengizinkan reques dari body
app.use(express.urlencoded({extended:true}))

//konfigurasi tempat upload file
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "./cover-image")
    },
    filename: (req, file, cb) => {
        cb(null, "cover-" + Date.now() + path.extname(file.originalname))
    }
})
//upload file
const upload = multer({storage: storage})

//endpoin GET
app.get("/", async (req, res)=>{
    //ambildata
    buku.findAll({
        include : [
            "rak"
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
    buku.findOne({where:param,include:["rak"]})
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
app.post("/", upload.single("cover") ,async (req, res)=>{
    //tampung data
    let data = {
        rak_id : req.body.rak_id,
        judul_buku : req.body.judul_buku,
        penulis_buku : req.body.penulis_buku,
        penerbit_buku : req.body.penerbit_buku,
        tahun_penerbit : req.body.tahun_penerbit,
        stok : req.body.stok,
        cover: req.file.filename
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
app.put("/", upload.single("cover"), async (req, res) => {
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
    //hapus data dan file lama
    if (req.file) {
        let oldBuku = await buku.findOne({where: parameter})
        let oldCover = oldBuku.cover
        //delete file lama
        let pathfile = path.join(__dirname, "../cover-image", oldCover)
        fs.unlink(pathfile, error => console.log(error))
        data.cover = req.file.filename
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
app.delete("/:buku_id", async (req,res)=> {
    //parameter
    let parameter = { buku_id: req.params.buku_id}

    //ambil data yang akan dihapus
    let oldBuku = await buku.findOne({where: parameter})
    let oldCover = oldBuku.cover

    let pathFile = path.join(__dirname, "../cover-image", oldCover)
    fs.unlink(pathFile, error => console.log(error))

    //delete dtaa
    buku.destroy({where: parameter})
    .then(result => {
        res.json({
            message: "Data has ben Deleted",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//export app
module.exports = app
