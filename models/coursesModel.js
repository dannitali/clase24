const mongoose = require('mongoose')

//definir Schema Courses
const CoursesSchema = new mongoose.Schema({
    title:{
        type: String,
        unique:[ true,"Titulo ya esta"],
        required: [
            true,
            "titulo requerido"
        ],
        max:[
            30 , "El titulo no debe ser mayor a 30"
        ],
        min:[
            10, "El titulo debe tener al menos 10 letras"
        ]
    },
    description:{
        type: String,
        required: [
            true,
            "Descripcion requerido"
        ],
        min:[
            10, "La descripcion debe tener al menos 10 caracteres"   
            ]
    },
    weeks:{
        type: Number,
        required:[
            "dirección requerida"
        ],
        max:[
            9 , "Las semanas no deben ser mayor a 9"
        ]
    },
    enroll_cost:{
        type: Number,
        required:[
            "dirección requerida"
        ]
    },
    minimum_skill:{
        type: [ String ],
        enum:[
            "beginner",
            "intermediate",
            "advanced",
            "expert"
        ]
    },
    createdAt: Date
}) 
module.exports = mongoose.model("Courses",
CoursesSchema)