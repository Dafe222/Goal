
const  CustomApiError = require('../error/customApiError')
const { StatusCodes} = require('http-status-codes')

const middleware = (err, req, res, next) =>{
     
    // server error
    let CustomApiError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, 
        msg: err.message || 'Something went wrong. please try again'
    } 

    // name,email or password field not enter error
    if(err.name === "ValidationError"){
        CustomApiError.msg = Object.values(err.errors)
        .map((item) =>item.message)
        .join(',')
        CustomApiError.statusCode = 400
    }


    //   name not match
    if(err.name === 'CastError'){
        CustomApiError.msg = `No item found with this: ${err.value} id`
        CustomApiError.statusCode = 404
    } 


    //    email already existed 
    if(err.code && err.code === 11000){
        // console.log(err.code);
        CustomApiError.msg = `Email already exit for ${Object.keys(
            err.keyValue
        )}. please enter another email`
        CustomApiError.statusCode = 400
    }  

    return res.status(CustomApiError.statusCode).json({
        msg: CustomApiError.msg
    })

    // first line of code
        // if(err instanceof CustomApiError){
        //     return res.status(err.statusCode).json({ msg: err.message})
        // } 
        // return res.status(500).json({msg: 'please try again later'})
} 

module.exports = middleware