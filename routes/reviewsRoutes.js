const express = require('express')
const ReviewsModel = require('../models/reviewsModel')
const mongoose = require('mongoose')
const router = express.Router()

//traer todas las rutas
router.get('/',async (req, res)=>{
    //utilizar el modelo para selecionar todos los reviews que hay en la base de datos
   try{
    const reviews=
        await ReviewsModel.find()

    if (reviews.length > 0) {
        res.
        status(200).
        json({
            success: true ,
            data: reviews
        })
    }else{

        res.
        status(400)
        .json({
            success: false ,
            message: "No hay reviews"
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

    //extraer el id del reviews del parametro de la url 
    try{
    const reviewsId=req.params.id
    if(!mongoose.Types.ObjectId.isValid(reviewsId)){
        res
        .status(500)
        .json({
          success: false,
          msg: "identificador invalido"
        })
   }else{
    const reviews =
    await ReviewsModel.findById(reviewsId)

        if(reviews){
            res.
                status(200).
                json({
                    success: true ,
                    data: reviews    
                })
        }else{
            res.
            status(400)
            .json({
                success: false ,
                message: `No hay reviews cuyo id es:${reviewsId}`
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

//crear un reviews

router.post('/',async (req, res)=>{
    try{
        const newReviews =
        await ReviewsModel.create(req.body)
        res.
        status(201)
        .json({
            success: true ,
            data: newReviews 
        })
    }catch(error){
        res.status(400)
        .json({
            success: false ,
            message: error.message
            })
    }
})


//actualizar un reviews por id

router.put('/:id',async(req, res)=>{

    try{
        reviewsId=req.params.id
        if(!mongoose.Types.ObjectId.isValid(reviewsId)){
            res
            .status(500)
            .json({
              success: false,
              msg: "identificador invalido"
            })
        }else{
        const updReviews =
            await ReviewsModel.
            findByIdAndUpdate(
                reviewsId,
                req.body,
                {
                    new: true 
                } )
        if (updReviews) {
                res.
                status(200).
                json({
                    success: true ,
                    data:updReviews
                    })
             }else{
                res.
                status(400)
                .json({
                    success: false ,
                    message: `No hay reviews cuyo id es:${reviewsId}`
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


//Eliminar un reviews por id

router.delete('/:id', async (req, res)=>{

    try{
        reviewsId=req.params.id
    if(!mongoose.Types.ObjectId.isValid(reviewsId)){
        res
        .status(500)
        .json({
          success: false,
          msg: "identificador invalido"
        })
    }else{
        const delReviews =
        await ReviewsModel.
        findByIdAndDelete(
            reviewsId
            )
            if (delReviews) {
                res.
                status(200).
                json({
                    success: true ,
                    data:delReviews
                    })
             }else{
                res.
                status(400)
                .json({
                    success: false ,
                    message: `No hay reviews cuyo id es:${reviewsId}`
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
