const Sequelize = require("sequelize");
const sequelizeInstance = new Sequelize(
 "userdatabase",
 "root",
 "Solanki@123",
    {
        host: "localhost",
        dialect: "mysql",
        operatorsAliases: 1,
        pool: {
            max: 5,
            min: 0,
            acquire:30000,
            idle: 10000
        }
    }
);

module.exports = sequelizeInstance;