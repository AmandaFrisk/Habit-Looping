//HOME OF THE ROUTES

//require express
const express = require('express');
// /Assign the built in mini app called router to the const variable called router
const router = express.Router()

//require the habits.js from the models
const Habit = require('../models/habits.js')


//Use router rather than app so it is a little faster 
//ROUTES

//INDEX ROUTE

router.get('/', (req,res)=>{
    res.send('index route is working')
})

//NEW ROUTE
router.get('/new', (req, res) => {
     res.send('new route is working')
    //   res.render('new.ejs');
  })

//POST CREATE ROUTE

//SHOW ROUTE
router.get('/id', (req, res) => {
    res.send('show route is working')

})
//EDIT ROUTE
//router.get('id',

//UPDATE

//router.put('/:id',

//DELETE


//router.delete('/:id',






//every route is going to be exported for router. It is an object and will hold all the routes
module.exports = router