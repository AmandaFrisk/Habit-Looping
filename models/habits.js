
//require mongoose to interface with Mongo
const mongoose = require('mongoose')

//CREATE SCHEMA
const habitSchema = new mongoose.Schema({
    habit: {type: String, required: true},
    description: {String},
    goal:{type: Number, required: true}     //goal number is referencing number of days
    })

//CREATE MODEL              //collection   //schema
const Habit= mongoose.model('Habit' , habitSchema)

//EXPORT MODEL
module.exports= Habit