
const mongoose = require('mongoose')

const goalSchema = new mongoose.Schema(

    {
        company: {
            type: String, 
            required: [true, 'Please provide company name' ],
            maxlength: 50
        },

        position: {
            type: String, 
            required: [true, 'Please provede position' ],
            maxlength: 150
        },

        status: {
            type: String, 
            enum: ['interview', 'declined', 'pending' ],
            default: 'pending'
        }, 

        createdBy: {
            type: mongoose.Types.ObjectId, 
            ref: 'User', 
            required: [true, 'Please provide user'],
        },
    }, 
    {timestamps: true}
 ) 

 module.exports = mongoose.model('Goal', goalSchema ) 