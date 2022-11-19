
const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("./customApiError");



class UnAuthorize extends CustomApiError{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
} 

module.exports = UnAuthorize