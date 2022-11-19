
const Goal = require('../SchemaModel/jobSchema')
const { StatusCodes} = require('http-status-codes')
const {UnAuthorize, AuthBadRequest } = require('../error/indexError'); 
const pageNotFound = require('../middleWares/PageNotFound');



// ==========GET ALL Goal======
const getAllGoal = async (req, res) =>{
    const goal = await Goal.find({createdBy: req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({ goal, count: goal.length })
}

// =======CREATE A Goal=======
const createAGoal = async (req, res) =>{
    req.body.createdBy = req.user.userId
   const goal = await Goal.create(req.body); 
   res.status(StatusCodes.CREATED).json({goal})
} 
// =======GET A SINGLE Goal============== 

const getAsingleGoal = async (req, res) =>{
    const { user: {userId}, params: {id: goalId} } = req; 

    const goal = await Goal.findOne({_id: goalId, createdBy: userId })
    if(!goal){
        throw new UnAuthorize(`No Match found for ${goalId}`)
    }
    res.status(StatusCodes.OK).json({goal})
}


// ========UPDATE A Goal========
const upDateAGoal = async (req, res) =>{
    const {
           body: {company, position},
           user: {userId},
           params: {id: goalId}
         } = req; 

      if (company === '' || position === ''){
        throw new AuthBadRequest('company or position field cannot be empty')
      }  
      const goal = await Goal.findByIdAndUpdate(
        { _id: goalId, createdBy: userId }, 
         req.body, 
         {new: true, runValidators: true}
      ) 
      if(!goal){
        throw new UnAuthorize(`No Match found for ${goalId}`)
    }
    
    res.status(200).json({ goal })
}


// ====================

const deleteAGoal = async (req, res) =>{
    const {
        user: {userId},
        params: {id: goalId}
      } = req;  
      const goal = await Goal.findOneAndRemove(
        { _id: goalId, createdBy: userId}
     )
     if(!goal){
        throw new AuthBadRequest(
            `No such goal with this id ${goalId} found`
        )
     }

    res.status(StatusCodes.OK).json({goal: 'Delete successfully' })
} 


module.exports = {
    getAllGoal, createAGoal, getAsingleGoal,
    upDateAGoal, deleteAGoal
}
