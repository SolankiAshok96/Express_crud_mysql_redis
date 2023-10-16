const dbConnection = require('./config/connection')
const serverConfig = require("./config/server.config")
const bodyParser = require("body-parser")
const client = require('./config/client')
const express = require('express');
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))




dbConnection.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

 client.on('connect', () => {
   console.log('Connected to Redis');
 });
 
 client.on('error', (err) => {
   console.error('Error connecting to Redis: ' + err);
 });

 require('./routes/user.routes')(app)

 app.listen(serverConfig.PORT , () =>{
    console.log("listening on port number " + serverConfig.PORT)
})

async function  init(){
  const result = await client.get("user:1");
  console.log("Result ->", result) 
}

//init();