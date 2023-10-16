const userController = require('../controller/user.controller')
const { validateUserBody} = require("../middleware")
const Redis = require('ioredis')
const User = require('../model/user.model')
const redis = new Redis();


module.exports = function(app){
     app.post('/api/v1/users',[validateUserBody.verifyUserBody], userController.createUser)
     app.get('/api/v1/users', userController.getUser)
     app.get('/api/v1/users/:id', userController.getUserById)
     app.put('/api/v1/users/:id', userController.updateUser)
     app.delete('/api/v1/users/:id', userController.DeleteUser)
    }

