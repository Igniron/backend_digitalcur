const {response} = require('express')
const { validationResult } = require('express-validator');
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/jwt')

const createUser = async (req, res = response) => {
    const { email, password} = req.body

    try {
        let user = await User.findOne({email})
        if( user ){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            })
        }
        
        //encrypt password
        user = new User ( req.body )
        const salt =  bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt )
        console.log(password)

        await user.save() //waiting for save in mongodb
        const token = await generateJWT(user.uid, user.name);
        res.status(201).json({ //status 201 (succes)
            ok: 'true',
            uid: user.id,
            name: user.name,
            pass: user.password,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: 'false',
            msg:'Have a failed in the registration process, please try again',
            
        })
        console.log(error)
    }

}

const loginUser = async (req, res = response) => {
    const { email, password} = req.body
    try {
        let user = await User.findOne({email})

        if( !user ){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            })
        }

        //Valid password

        const validPassword = bcrypt.compareSync( password, user.password)

        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Invalid password"
            })
        }

        //Generar JWT
        const token = await generateJWT(user.uid, user.name);

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            email: user.email,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok: 'false',
            msg:'Email or Password is incorrect',
        })
        console.log(error)
    }
}

const renewToken = async(req, res = response) => {
    const {uid, name} = req;

    const token = await generateJWT(uid, name);
        
    res.status(201).json({
        ok: true,
        uid,
        name,
        token,
        msg: 'Token renovado',
    })
}

module.exports = {
    createUser,
    loginUser,
    renewToken,
}