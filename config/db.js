const mongoose = require('mongoose')

const conectarDB = async() => {
    await mongoose.connect(process.env.MONGO_URL)//monsodb
    console.log("Mongo db conectado".bgBlue.red)
} 

module.exports = conectarDB