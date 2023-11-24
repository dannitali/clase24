const mongoose = require('mongoose')

//definir Schema Reviews
const ReviewsSchema = new mongoose.Schema({
    title:{
        type: String,
        unique:[ true,"Titulo ya esta"],
        required: [
            true,
            "titulo requerido"
        ],
        max:[
            20 , "El titulo no debe tener mas de 20 caracteres "
        ]
    },
    text:{
        type: String,
        required: [
            true,
            "texto requerido"
        ],
        max:[
            50 , "El texto no debe tener mas de 50 caracteres "
        ]
    },
    rating:{
        type: Number,
        required:[
            "Calificacion requerida"
        ],
        max:[
            10 , "Las calificaciones no deben ser mayor a 10"
        ],
        min:[
            1 , "Las calificaciones no deben ser menor a 1"
        ]
    },
    createdAt: Date
}) 
module.exports = mongoose.model("Reviews",
ReviewsSchema)