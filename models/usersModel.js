const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require ('jsonwebtoken')
const userShema= new mongoose.Schema({
    name :{
        type: String,
        required: [true,"nombre requerido"]
    },
    email :{
        type: String,
        unique: [true,"email repetido"],
        required: [true,"email requerido"],
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "email requerido"
        ]
    },
    password :{
        type: String,
        required: [true,"password requerido"],
        maxlength:[6,"password muy largo"],
        //para que el password no se visualise
         select: false 
    },
    rol :{
        type: String,
        enum: ["admin", "user", "publisher"],
        default:"user"
    },
    createdAt:{
        type: Date ,
        default: Date.now
    }
})

userShema.pre('save',async function(){
    //general la sal(algoritmo de incriptacion)
    const sal = await bcryptjs.genSalt(10,this.password)
    //encriptar
    this.password = await bcryptjs.hash(this.password, sal)
})

//metodo para comparar password del ususrio vs password del proyecto

userShema.methods.compararPassword= function(password){
    return bcryptjs.compare(password, this.password)
}


//metodo para crear el JWT 
userShema.methods.generarJWT = function(){
    return jwt.sign({
        id: this._id,
        email: this.email
                    },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.JWT_EXPIRE
        }            
    )
}

module.exports= mongoose.model('User',userShema)