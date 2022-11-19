
require('dotenv').config() 
const express = require('express')
const app = express()
require('express-async-errors') 

// security 
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')


// import DB
const connectDB = require('./connectDB/connectDB')

// import auth 
const auth = require('./middleWares/authenticationMiddleWare')
const authRouter = require('./routes/authRoute')
const goalRouter = require('./routes/goalRouter')

// import middleware
const pageNotFound = require('./middleWares/PageNotFound')
const middleware = require('./middleWares/middleWare')



app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())


// ROUTES
app.use('/api/v1/auth',authRouter) 
app.use('/api/v1/goal', auth, goalRouter)

app.use('/api/v1/test',(req, res) =>{
    res.send('Welcome On borde Giddy')
})


// MIDDLERWARE FUNCTION
app.use(pageNotFound) 
app.use(middleware)




const port = process.env.PORT || 4000
const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server Running on port ${port}`))
    } catch (error) {
      console.log(error);  
    }
}
start() 

// 8:44:48