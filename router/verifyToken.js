const jwt = require("jsonwebtoken")

verifyToken = (req, res, next) => {
    let headers = req.headers.authorization
    let token = null

    if (headers != null) {
        token = headers.split(" ")[1]
        // headers = Bearer kode_token
        // split -> untuk mengkonversi string menjadi array
        // array = ["Bearer", "kode_token"]
    }

    if ( token ==  null) {
        res.json
        ({
            message: "Unauthorized"
        })
    } else {
        //header
        let jwtHeader = {
            algorithm : "HS256"
        }
        //secretkey
        let secretkey = "MOKLETMALANG"
        //verify token
        jwt.verify(token, secretkey, jwtHeader, error => {
            if (error) {
                res.json({
                    message: "Invalid or expired token"
                })
            } else {
                next()
            }
        })
    }
}

//export
module.exports = verifyToken