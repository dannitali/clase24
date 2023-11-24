const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
const { request } = require('express');


// iddleware para proteger las rutas a usurios no logeados

exports.protect = async(req, res, next)=>{

    let token 
    //1. vereficar si existe el header 'authorization'
    if (req.headers.authozation && 
        req.headers.authozation.
        startsWith('Bearer')) {
            token = req.
                    headers.
                    authozation.
                    split(' ')[1]
                                }
    if (!token) {
        return res.
                status(401).
                json({
                    success: false,
                    msg: "Invalid token"
                    })
                }else{
                    const decoded=jwt.verify(token, 
                        process.env.JWT_SECRET_KEY)
                        console.log(decoded)
                }
}

//middleware para proteger de suurios que no tengan el rol especifico 

exports.authorize = async(req, res, next)=>{

}

