// https://habit-looping.herokuapp.com/ 

//HOME OF THE ROUTES

//require express
const express = require('express');
// /Assign the built in mini app called router to the const variable called router
const router = express.Router()

//require the habits.js from the models
const Habit = require('../models/habits.js')


//Use router rather than app so it is a little faster 
//ROUTES


//DEFAULT

//INDEX ROUTE

router.get('/', (req,res)=>{
    // res.send('index route is working')
    Habit.find({}, (error, allHabits)=>{
      console.log(allHabits)
      res.render('index.ejs', 
          {allHabits})
    })
  })
  



//NEW ROUTE
router.get('/new', (req, res) => {
    //  res.send('new route is working')
    res.render('new.ejs')

})
  

//POST CREATE ROUTE
router.post('/', (req,res)=>{
  
  Habit.create(req.body, (err, createdHabit)=>{
      if(err) {
          console.log('error', error)
          res.send(error)
      } else {
          res.redirect('/habits')
      }
  })
})
//SHOW ROUTE
router.get('/:id',  (req, res) => {
  // res.send('show route is working')
   Habit.findById(req.params.id, (err, foundHabit)=>{
      
      res.render('show.ejs', {
          habit:foundHabit
      });
  });
});
//EDIT ROUTE
router.get('/:id/edit', (req, res)=>{
  Habit.findById(req.params.id, (err, foundHabit)=>{ //find the product  
      res.render(
      'edit.ejs',
      {
        habit: foundHabit //pass in found product
      })
  })
})

//UPDATE
router.put('/:id', (req,res)=>{
  Habit.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,updatedProduct)=>{
    if (err){
      console.log('update err', err)
    }else{
      res.redirect(`/habits/${req.params.id}`)
    }
  })
})


//DELETE
router.delete('/:id', (req, res)=>{
  Habit.findByIdAndRemove(req.params.id, (err, data)=>{
      res.redirect('/habits') //redirect back to index page
  })
})








//every route is going to be exported for router. It is an object and will hold all the routes
module.exports = router