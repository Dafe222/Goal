
const express = require('express')
const goalRouter = express.Router() 

const{
      getAllGoal, createAGoal,
      getAsingleGoal, upDateAGoal,
      deleteAGoal
} = require('../controller/jobController') 

goalRouter.route('/').get(getAllGoal).post(createAGoal)
goalRouter.route('/:id').get(getAsingleGoal).patch(upDateAGoal).delete(deleteAGoal) 

module.exports = goalRouter