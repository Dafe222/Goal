
const User = require('../SchemaModel/UserSchema')
const {StatusCodes } = require('http-status-codes')
const {AuthBadRequest, UnAuthorize } = require('../error/indexError')



// REGISTER LINE OF CODE
const register = async (req, res) =>{ 
  const user = await User.create({...req.body})
  const token = user.createJwt()
  res.status(StatusCodes.CREATED).json({user:{name: user.name}, token})
}


// LOGIN CODE
const login = async (req, res) =>{
    const { email, password} = req.body; 
    if(!email || !password){
      throw new AuthBadRequest(
        'Please provide email or password'
      )
    }

     // compare user
    const user = await User.findOne({ email})
    if(!user){
      throw new UnAuthorize( 'User does not exist')
    } 

    // compare password 
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
      throw new UnAuthorize( 'Password does not matched')
    } 


    const token = await user.createJwt()
    res.status(StatusCodes.OK).json({user:{name: user.name}, token})
  } 


  module.exports = { register, login}