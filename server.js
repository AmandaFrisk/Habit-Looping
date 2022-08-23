const express = require('express')
const app =express()
const port = 3002


//IMPORT CONTROLLER
const habitsController =require('./controllers/habitsController.js')



//MIDDLEWARE

//define route -goes to route /habits plus whatever routes are inside the controller
app.use('/habits', habitsController)






app.listen (port, ()=> {
    console.log('listening on port', port)
    })
     