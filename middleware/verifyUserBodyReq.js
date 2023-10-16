const userModel = require("../model/user.model")

const verifyUserBody = (req ,res,next) =>{
  
   if(!req.body.name){
       res.status(404).send({
        message : "Please enter a name"
       })
   }
   
    if(!req.body.email){
          res.status(404).send({
          message : "please enter a email address"
      })
   }

   if(!req.body.age){
     res.status(404).send({
        message : "please enter a age "
     })
   }

   if(!req.body.gender){
     res.status(404).send({
        message : "please enter a gender"
     });
   }

   next();

} 

let validateUserBody = {
     verifyUserBody : verifyUserBody
}

module.exports = validateUserBody