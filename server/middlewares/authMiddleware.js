const jwt = require('jsonwebtoken')

//to verify the token in the req
const auth = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1]
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.body = {}
        req.body.userId = verifiedToken.userId
        next()
    }
    catch(e){
        res.status(401).send({ success: false, message: "Token Invalid" })
    }
}

module.exports = auth