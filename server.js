const express = require('express')
const dotenv = require ('dotenv')
const colors = require('colors')
const conectarDB = require('./config/db')
//dependencias de rutas 
const bootcampRoutes = require('./routes/bootcampRoutes')
const CoursesRoutes = require('./routes/coursesRoutes')
const ReviewsRoutes = require('./routes/reviewsRoutes')
const userRoutes = require ('./routes/usersRoutes')
const cookieParser = require('cookie-parser')
//vincular el archivo. env 
dotenv.config(
    {path:'./config/.env'}
)

//conexion base de datos
conectarDB()

//contruir el objeto de la aplicación
const app = express()
app.use(express.json())
app.use(cookieParser())


//conectar las rutas 
//al objeto
app.use('/api/v1/devcamp/bootcamps',
bootcampRoutes)

app.use('/api/v2/devcamp/courses',
CoursesRoutes)

app.use('/api/v3/devcamp/reviews',
ReviewsRoutes)

app.use('/api/v3/devcamp/auth',
userRoutes)

app.listen(process.env.PUERTO ,()=> {
console.log(`servidor en ejecucion: ${process.env.PUERTO}`.bgYellow.bgGreen.bold)
})