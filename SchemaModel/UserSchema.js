
const mongoose = require('mongoose') 
require('dotenv').config() 

const jwt = require('jsonwebtoken') 
const bycrpt = require('bcryptjs')


const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'please provide name'], 
        minLength: 3, 
        maxLength: 50,
    },

    email: {
        type: String, 
        required: [true, 'please provide email'], 
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valide email',
        ],
       unique: true
    },
    
    password: {
        type: String, 
        required: [true, 'please provide name'], 
        minLength: 6, 
    }, 
})   


// hash password code
// this can also be written in Register controller
UserSchema.pre('save', async function() { 
    const salt = await bycrpt.genSalt(10)
    this.password = await bycrpt.hash(this.password, salt) 
}) 


// jwt code
// this can also be written in Register controller
UserSchema.methods.createJwt = function() {
  return jwt.sign({  userId: this._id, name: this.name,}, 
    process.env.JWT_SECRETE, { expiresIn: process.env.LIFE_TIME } 
  )
} 

// compare login password
UserSchema.methods.comparePassword = async function (candidatePassword){
    const isMatch = await bycrpt.compare(candidatePassword, this.password)
    return isMatch
} 


module.exports = mongoose.model('User', UserSchema)
