let sequelizeInstance = require("../config/connection");
const sequelize = require("sequelize");

let  Users = sequelizeInstance.define(
    "Userdetails",
    {
      id: {
        type: sequelize.DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: sequelize.DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: sequelize.DataTypes.NUMBER,
        allowNull: false,
      },
      gender :{
         type : sequelize.DataTypes.STRING,
         allowNull: false,
      },
     email : {
         type : sequelize.DataTypes.STRING,
         allowNull: false,
    }
    },
    {
      timestamps: false,
    }
  );


module.exports = Users;