require('dotenv').config({
    path:"./config/config.env"
})
const express = require('express')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const cors =  require('cors')
const connectDB = require('./config/db')

connectDB()

const app = express()
app.use(bodyparser.json())
if(process.env.NODE_ENV === 'development'){
    app.use(cors({
        origin:process.env.URL
    }))
    app.use(morgan('dev'))
}
const authRouter = require('./routes/auth.route')

app.use('/api/',authRouter)


app.use((req,res,next)=>{
    res.status(404).json({
        success:false,
        message:"Page Not Found"
    })
})

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`)
})