const express = require("express")
const app = express()

//import modul
const rak = require ("./router/rak")
const buku = require ("./router/buku")

//use modul
app.use("/rak", rak)
app.use("/buku", buku)

//run server
app.listen(2000, () => {
    console.log("Run server on port 2000")
})