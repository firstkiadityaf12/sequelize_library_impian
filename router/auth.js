const express = require("express")
const app = express()

//panggil jwt //npm install jsonwebtoken
const jwt = require("jsonwebtoken")
const md5 = require("md5")

//call models
const petugas = require("../models/index").petugas

//akses req dari body
app.use(express.urlencoded({extended: true}))

//endpoint ;login
app.post("/login", async (req, res) => {
    //parameter
    let parameter = {
        username : req.body.username,
        password : md5(req.body.password)
    }

    //result
    let result = await petugas.findOne({where: parameter})
    if (result === null) {
        // invalid username dan password
        //maka
        res.json({
            message: "Invalid Username or Password"
        })
    } else {
        //login success
        //generate token dengan jwt
        //header, payload, secretkey\
        let jwtHeader = {
            algorithm: "HS256",
            expiresIn: "1h"
        }

        let payload = {data: result}
        let secretkey = "MOKLETMALANG"

        let token = jwt.sign(payload, secretkey, jwtHeader)
        res.json({
            data: result,
            token: token
        })
    }
})

//export 
module.exports = app