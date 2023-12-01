const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
const { request } = require('express');


// iddleware para proteger las rutas a usurios no logeados

exports.protect = async(req, res, next)=>{
    try{
        let token 
        //1. vereficar si existe el header 'authorization'
        if (req.headers.authorization && 
            req.headers.authorization.
            startsWith('Bearer')) {
                token = req.
                        headers.
                        authorization.
                        split(' ')[1]
                                    }
        if (!token) {
            return res.
                    status(401).
                    json({
                        success: false,
                        msg: "USUARIO NO AUTORIZADO"
                        })
        }else{
                        const decoded=jwt.verify(token, 
                            process.env.JWT_SECRET_KEY)
                            //console.log(decoded)
                            //añadir al require en user
                            req.user = await usersModel.findById(decoded.id)
                            //redirigir a la ruta de bootcamps
                            next()
            }

    }catch(error){
        res.status(500).json({
            success: false,
            msg: error.message
        })
    }
    
}

//middleware para proteger de suurios que no tengan el rol especifico 

exports.authorize = (role) =>{
     return async(req, res, next)=>{
         //comparar si el rol del parametro es igual alrol del usuraio
        if (req.user.role !== role) {
            res.status(401).json({
                success: false,
                msg: "ROL NO AUTORIZADO"
            })
        }else{
            next()
        }
     }
}

