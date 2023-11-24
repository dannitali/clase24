const express = require('express')
const CoursesModel = require('../models/coursesModel')
const mongoose = require('mongoose')

const router = express.Router()

//traer todas las rutas
router.get('/',async (req, res)=>{
    //utilizar el modelo para selecionar todos los courses que hay en la base de datos
   try{
    const courses=
        await CoursesModel.find()

    if (courses.length > 0) {
        res.
        status(200).
        json({
            success: true ,
            data: courses
        })
    }else{

        res.
        status(400)
        .json({
            success: false ,
            message: "No hay courses"
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

//traer un courses  por id

router.get('/:id',async(req, res)=>{

    //extraer el id del courses del parametro de la url 
    try{
    const coursesId=req.params.id
    if(!mongoose.Types.ObjectId.isValid(coursesId)){
        res
        .status(500)
        .json({
          success: false,
          msg: "identificador invalido"
        })
   }else{
    const courses =
    await CoursesModel.findById(coursesId)

        if(courses){
            res.
                status(200).
                json({
                    success: true ,
                    data: courses    
                })
        }else{
            res.
            status(400)
            .json({
                success: false ,
                message: `No hay courses cuyo id es:${coursesId}`
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

//crear un courses

router.post('/',async (req, res)=>{
    try{
        const newCourses =
        await CoursesModel.create(req.body)
        res.
        status(201)
        .json({
            success: true ,
            data: newCourses 
        })
    }catch(error){
        res.status(400)
        .json({
            success: false ,
            message: error.message
            })
    }
})


//actualizar un courses por id

router.put('/:id',async(req, res)=>{

    try{
        coursesId=req.params.id
        if(!mongoose.Types.ObjectId.isValid(coursesId)){
            res
            .status(500)
            .json({
              success: false,
              msg: "identificador invalido"
            })
        }else{
        const updCourses =
            await CoursesModel.
            findByIdAndUpdate(
                coursesId,
                req.body,
                {
                    new: true 
                } )
        if (updCourses) {
                res.
                status(200).
                json({
                    success: true ,
                    data:updCourses
                    })
             }else{
                res.
                status(400)
                .json({
                    success: false ,
                    message: `No hay courses cuyo id es:${coursesId}`
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


//Eliminar un courses por id

router.delete('/:id', async (req, res)=>{

    try{
        coursesId=req.params.id
    if(!mongoose.Types.ObjectId.isValid(coursesId)){
        res
        .status(500)
        .json({
          success: false,
          msg: "identificador invalido"
        })
    }else{
        const delCourses =
        await CoursesModel.
        findByIdAndDelete(
            coursesId
            )
            if (delCourses) {
                res.
                status(200).
                json({
                    success: true ,
                    data:delCourses
                    })
             }else{
                res.
                status(400)
                .json({
                    success: false ,
                    message: `No hay courses cuyo id es:${coursesId}`
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
