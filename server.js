const express = require("express")
const app = express()

//import modul
const rak = require ("./router/rak")
const buku = require ("./router/buku")
const petugas = require ("./router/petugas")
const anggota = require ("./router/anggota")

//use modul
app.use("/rak", rak)
app.use("/buku", buku)
app.use("/petugas", petugas)
app.use("/anggota", anggota)

//run server
app.listen(2000, () => {
    console.log("Run server on port 2000")
})