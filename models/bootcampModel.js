const mongoose = require('mongoose')

//definir Schema Bootcamp
const BootcampSchema = new mongoose.Schema({
    name:{
        type: String,
        unique:[ true,"Nombre ya esta"],
        required: [
            true,
            "nombre requerido"
        ]
    },
    phone:{
        type: Number,
        required: [
            true,
            "Telefono requerido"
        ],
        max:[
            9999999999 , "Telefono no debe ser mayor a 10"
        ],
        min:[
            1111111, "Telefono debe tener al menos 7 digitos"
        ]
    },
    address:{
        type: String,
        required:[
            "dirección requerida"
        ]
    },
    topics:{
        type: [ String ],
        enum:[
            "backend",
            "frontend",
            "Devops",
            "AI"
        ]
    },
    createdAt: Date
}) 
module.exports = mongoose.model("Bootcamp",
            BootcampSchema)