const {response} = require('express')
const JWT = require('jsonwebtoken')

const validateJWT = (req, res, next) => {
    //Recibir JWT -> x-token headers
    const token = req.header('x-token')
    console.log(token)
    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: "Not have a token"
        })
    }
    try{
        const payload = JWT.verify(
            token,
            process.env.SECRET_JWT_SEED
        )
        console.log(payload)    
    }catch(err){
        console.log(err)
        return res.status(401).json({
            ok:false,
            msg: 'Not valid token'
        })
    }
    next()
}

module.exports = {
    validateJWT
}