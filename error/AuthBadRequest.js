const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("./customApiError");



class AuthBadRequest extends CustomApiError{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
} 

module.exports = AuthBadRequest