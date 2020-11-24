const mongoose = require('mongoose')


const connectDB = async() => {
    const connection = await mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology: true,
        useCreateIndex:true,
        useFindAndModify:false
    })
    console.log(`MongoDB connected: ${connection.connection.host}`) 
};
module.exports = connectDB