const connection = require("../config/connection");
const User = require("../model/user.model");
const client = require('../config/client')
const Redis = require("ioredis");
const { json } = require("body-parser");

const redis = new Redis() 




const createTable = async () => {
  await connection.sync({ force: true });
  console.log("table is created succesfully");
};

// createTable()

exports.createUser = async (req, res) => {
  try {
    let userAdd = req.body;
    await User.create(userAdd);
    await client.hset("user", {userAdd});
    res.status(201).send("New user added");
    
  
    
    res.end();
  } catch (err) {
    res.status(500).send({
      message: "Error occured while creating user " + err,
    });
  }
};
   
//  exports.getUser = async (req, res, next) => {
    
//    try {
//            let =  user = await User.findAll();
//             res.status(200).send(user)
//          res.end();
//      } 
       
//       catch (err) {
//      res.status(500).send({
//        message: "Error occured while getting user " + err,
//      });
//    }

//  }



// exports.getUserById = async (req, res) => {
//   try {
//      let user = await User.findOne({
//       where: {
//         id: id,
//       },
//     });

//       res.status(200).send({
//       message: "succesfully fetched data by using id ",
//       user,

//     });
    
//      res.end()

//   } catch (err) {
//    return res.status(500).send({
//       message: "errorr occurred while updating user",
//     });
//   }
// };

exports.updateUser = async (req, res) => {
  try {
    let id = req.params.id;
    let userToUpdate = {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      gender: req.body.gender,
    };

    await User.update(userToUpdate, {
      where: {
        id: id,
      },
    });

    let updateUser = await User.findByPk(id);
    res.status(200).send(updateUser);
  } catch (err) {
    res.status(500).send({
      message: "errorr occurred while updating user",
    });
  }
};
exports.DeleteUser = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await User.findOne({
      where: {
        id: id,
      },
    });

  await user.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).send({
      message: "succesfully deleted data",
    });
  } catch (err) {
    res.status(500).send({
      message: "error occurred while deleting user",
    });
  }
};


exports.getUser = async (req, res ,next) =>{

   redis.get("Userdetails" , async(err, data) =>{
        try{
        if(data !==null){
          return res.status(200).send({
            message: "data found",
            data : JSON.parse(data)
          })
        }else{
          let udata = await User.findAll();
             if(udata !=null){
               return res.status(200).send({
                    udata
               })
             }
           redis.setex("Userdetails", 10, JSON.stringify(udata));
           return res.status(200).send({
             message : 'DATA found',
             data : JSON.parse(udata)
           })
        }
        }catch(err){
         console.log(err);
         return res.status(400).send({
            message : "unable to find data",
           })
        }
     })
   
} 

exports.getUserById = async (req ,res , next) => {
    const id = req.params.id;
    const cathedData = await redis.get(`User:${id}`)
    
    if(cathedData){
       res.json(JSON.parse(cathedData))
    }else{
       try{
            const user = await User.findOne({
              where: {
                 id: id,
                     },
            })
            //  if(user !== null){
            //      return res.status(200).send(
            //         user
            //      )
            //  }
              
            if(!user){
              return res.status(404).json({ error: 'Note not found' });
               
            }
      


           await redis.setex(`User${id}`,10, JSON.stringify(user))  
             res.json(user)
       }catch(err){
        console.error('Error fetching note: ' + err);
        res.status(500).json({ error: 'Internal Server Error' });
       }
    }
           
}

