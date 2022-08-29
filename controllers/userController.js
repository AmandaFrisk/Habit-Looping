//REQUIRE EXPRESS
const express = require('express')

//REQUIRE BCRYPT
const bcrypt=require('bcrypt')

//REQUIRE USER MODEL
const User = require('../models/users')

//SET UP ROUTER
const router = express.Router()

//REGISTER ROUTE 
router.get('/register', (req, res)=>{
    res.render('users/register.ejs')
})

//WHERE FORM IS GOING TO SUBMIT TO CREATE
router.post('/register', (req,res)=>{
    //encrypt passwords with bcrypt library 
    const salt = bcrypt.genSaltSync(10)
    //generate the hashed password
   req.body.password = bcrypt.hashSync(req.body.password, salt)
   console.log(req.body)

    //check if username already exists

    User.findOne({username: req.body.username}, (err, userExists) =>{
        if(userExists) {
            res.send('this username is taken')
        } else{
            User.create(req.body, (err, createdUser)=>{
                // console.log(createdUser)
                // res.send('user created')
                req.session.currentUser = createdUser
                res.redirect('/habits')
            })
        }
    })

})

//SIGN IN ROUTE
router.get('/signin', (req, res)=>{
    res.render('users/signin.ejs')
})

//allow user to sign in
router.post('/signin', (req,res) => {
    //get user with that username
    User.findOne({username: req.body.username}, (err, foundUser) => {
        if (foundUser){
            //compare password using bcrypt's compareSync function
            const validLogin = bcrypt.compareSync(req.body.password, foundUser.password)
            //compareSync returns true if they match and false if they don't 
            //if they passwords match, log them in
        if (validLogin){
            //let session know there is a successful login
            req.session.currentUser = foundUser
             res.redirect('/habits')

        } else {
            //if they dont match
            res.send('Invalid username or password')
            // res.redirect('/signin')
        }
        } else {
            //if they don't exist
            res.send('Invalid username or password')
            // res.redirect('/signin')
        }
    })
})

//DESTROY SESSION ROUTE
router.get('/signout', (req,res)=>{
   //destoy the session
    req.session.destroy()
    res.redirect('/home')
})

module.exports= router