

const mongoose = require('mongoose')

const connectDB = (url) =>{
    console.log('DB Connected');
    return mongoose.connect(url)
}

module.exports = connectDB
