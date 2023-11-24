const express = require('express')
const BootcampModel = require('../models/bootcampModel')
const bootcampModel = require('../models/bootcampModel')
const mongoose = require('mongoose')
//dependencias al middleware

const{protect,authorize}
    = require ('../middleware/auth')

const router = express.Router()

//traer todas las rutas
router.get('/',async (req, res)=>{
    //utilizar el modelo para selecionar todos los bootacmot que hay en la base de datos
   try{
    const bootcamps=
        await BootcampModel.find()

    if (bootcamps.length > 0) {
        res.
        status(200).
        json({
            success: true ,
            data: bootcamps
        })
    }else{

        res.
        status(400)
        .json({
            success: false ,
            message: "No hay bootcamps"
        })

    }
   }catch(error){
    res.
    status(400)
            .json({
                success: false ,
                message: error.message
            })
   }
})

//traer un bootcamp  por id

router.get('/:id',async(req, res)=>{

    //extraer el id del bootcamp del parametro de la url 
    try{
    bootcampId=req.params.id
    if(!mongoose.Types.ObjectId.isValid(bootcampId)){
        res
        .status(500)
        .json({
          success: false,
          msg: "identificador invalido"
        })
   }else{
    const bootcamp =
    await BootcampModel.findById(bootcampId)

        if(bootcamp){
            res.
                status(200).
                json({
                    success: true ,
                    data: bootcamp    
                })
        }else{
            res.
            status(400)
            .json({
                success: false ,
                message: `No hay bootcamp cuyo id es:${bootcampId}`
            })
        }

    }
}catch(error){
    res.
    atatus(400)
    json({
        success: false ,
        message: error.message
    })
}
})

//crear un bootcamps

router.post('/' , protect , async (req, res)=>{
    try{
        const newBootcamp =
        await bootcampModel.create(req.body)
        res.
        status(201)
        .json({
            success: true ,
            data: newBootcamp 
        })
    }catch(error){
        res.status(400)
        .json({
            success: false ,
            message: error.message
            })
    }
})


//actualizar un bootcamp por id

router.put('/:id',async(req, res)=>{

    try{
        bootcampId=req.params.id
        if(!mongoose.Types.ObjectId.isValid(bootcampId)){
            res
            .status(500)
            .json({
              success: false,
              msg: "identificador invalido"
            })
        }else{
        const updBootcamp =
            await bootcampModel.
            findByIdAndUpdate(
                bootcampId,
                req.body,
                {
                    new: true 
                } )
        if (updBootcamp) {
                res.
                status(200).
                json({
                    success: true ,
                    data:updBootcamp
                    })
             }else{
                res.
                status(400)
                .json({
                    success: false ,
                    message: `No hay bootcamp cuyo id es:${bootcampId}`
                     })
            }
    }
    }catch(error){
        res.
        status(400)
        .json({
            success: false ,
            message: error.message
            })
    }
})


//Eliminar un bootcamp por id

router.delete('/:id', async (req, res)=>{

    try{
    bootcampId=req.params.id
    if(!mongoose.Types.ObjectId.isValid(bootcampId)){
        res
        .status(500)
        .json({
          success: false,
          msg: "identificador invalido"
        })
    }else{
        const delBootcamp =
        await bootcampModel.
        findByIdAndDelete(
            bootcampId
            )
            if (delBootcamp) {
                res.
                status(200).
                json({
                    success: true ,
                    data:delBootcamp
                    })
             }else{
                res.
                status(400)
                .json({
                    success: false ,
                    message: `No hay bootcamp cuyo id es:${bootcampId}`
                     })
            }

    }

    }catch(error){
        res.
        status(400)
        .json({
            success: false ,
            message: error.message
            })
    }


})

module.exports = router
