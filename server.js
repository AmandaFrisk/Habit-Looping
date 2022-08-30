const express = require('express')
const app =express()
const methodOverride = require('method-override');

//require session
const session = require('express-session')

//Environment Variables (env)
//require dotenv - config to set up access for env file so we can pull variables from it instead of hardcoding it in
require('dotenv').config()

//ASSIGN ENV TO PORT
const PORT = process.env.PORT || 3000



//SESSION
const SESSION_SECRET = process.env.SESSION_SECRET
// console.log('session secret')

//IMPORT CONTROLLERS
const habitsController =require('./controllers/habitsController.js')

const userController = require('./controllers/userController.js')


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
// attach a cookie to response- will then get saved by the users browser. Browser will send it back in its request . The server will then beable to identify the user.
app.use(session({
    secret: SESSION_SECRET,
    resave: false, 
    saveUninitialized: false       
}))

app.use(express.static('public'))
// What comes back from the new.ejs body is going to be parsed into json format so we can easily manipulate it
app.use(express.json());
// //Recognize incoming objects as strings or arrays - Also helps us receive json from the new.ejs body
app.use(express.urlencoded({ extended:false }));
// //after app has been defined
// //use methodOverride.  We'll be adding a query parameter to our delete form named _method
app.use(methodOverride('_method'))
//define route -goes to route /habits plus whatever routes are inside the controller
app.use('/habits', habitsController)
// tell app to use this for all the routes in the userController
app.use('/users', userController)

//DEFAULT
// app.get("/", (req,res)=>{
// res.send('default working' )
// })


// LISTEN FOR PORT
app.listen (PORT, ()=> {
    console.log(` Server running on port ${PORT}`)
    })
     