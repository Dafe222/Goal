

const User = require("../SchemaModel/UserSchema")
const jwt = require('jsonwebtoken')
// const UnAuthorize = require("../error/UnAuthorize") 
const {UnAuthorize} = require('../error/indexError')


const auth = async (req, res, next) =>{
    // check for header
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')){
    throw new UnAuthorize(
        ' Access denial, please register or login with valid credential')
    } 

    const token = authHeader.split(' ')[1] 
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRETE)
        // attach user to job/gaol route
        const user = User.findById(payload.id).select('-password')
        req.user = user
        req.user = {userId: payload.userId, name: payload.name}
        next()
    } catch (error) {
        console.log(error);
        throw new UnAuthorize(
            ' Access denial, please register or login with valid credential'
        )
    }
} 

module.exports = auth 