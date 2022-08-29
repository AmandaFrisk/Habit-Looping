// REQUIRE MONGOOSE
const mongoose = require('mongoose')

//CREATE USER SCHEMA
const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
    
   
})

//                          collection   schema
const User = mongoose.model('User', userSchema)

//EXPORT USER
module.exports=User