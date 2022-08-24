const express = require('express')
const app =express()
// const port = 3002


//Environment Variables (env)
//require dotenv - config to set up access for env file so we can pull variables from it instead of hardcoding it in
require('dotenv').config()

// assign env PORT TO variable
const PORT = process.env.PORT

//IMPORT CONTROLLER
const habitsController =require('./controllers/habitsController.js')



//SET UP MONGOOSE

//require mongoose
const mongoose = require('mongoose')
//set variable for accessing process.env.MONGODB_URI
const mongoURI = process.env.MONGODB_URI
//  connect - speak to mongo ip address for local host:port/db name  - - - ip is for the local host -your machine is using to talk to itself over the network through the port
mongoose.connect(mongoURI)
//connect - open it and then console log
mongoose.connection.once('open', () =>{
    console.log('connected to mongo')
})



//MIDDLEWARE

//define route -goes to route /habits plus whatever routes are inside the controller
app.use('/habits', habitsController)





// LISTEN FOR PORT
app.listen (PORT, ()=> {
    console.log(` Server running on port ${PORT}`)
    })
     