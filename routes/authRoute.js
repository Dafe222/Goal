
const express = require('express')
const authRouter = express.Router()

const { register, login} = require('../controller/Usercontroller') 

authRouter.post('/register',register);
authRouter.post('/login',login) 

module.exports = authRouter
