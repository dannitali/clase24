const express = require('express')
const router =express.Router()
const mongoose = require('mongoose')
const UserModel = require('../models/usersModel')

//registro de ususrios
router.post('/register',async (req,res)=>{
    try{
           const user = await UserModel.create(req.body)
           //crear token 
           const token= user.generarJWT()
    res.status(201).json({
        success: true,
        data: user,
        token_jwt : token
    }) 
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
     }) 
    }

})
//inicio de sesion 
router.post('/login',async (req,res)=>{
    //no llleg el wmail o passsword
    const {email,password }= req.body;
    if (!email || !password) {
         return res.status(400).json({
            success: false,
            message: 'Falta email o password'
        }) 
    }else{
        //2 si llega el emal pero el usurio de se emai no existe
        const user = await UserModel
                                .findOne({email})
                                .select("+password")
        //console.log(user)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'El usurio no existe'
            }) 
        }else{
            //si lega email y el susrio existe pero el passeord no corresponde
            const isMatch =await user.compararPassword(password)

            if (isMatch) {
                const token = user.generarJWT()
                //opciones para la creacion de las cookies
                const options ={
                    expires : new Date(
                                        Date.now() + 
                                        process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
                                        httpOnly : true,

                }
                return res.
                status(200).
                cookie('token', token, options).
                json({
                    
                    success: true,
                    message: 'El usuario logeado correctamente',
                    data: user,
                    jwt_token : token
                }) 
            }else{
                return res.status(400).json({
                    success: false,
                    message: 'Credenciales incorrectas'
                }) 
            }

        }
    }


})


module.exports = router