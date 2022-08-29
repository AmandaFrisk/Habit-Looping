//REQUIRE EXPRESS
const express = require('express')
//SET UP ROUTER
const router = express.Router()

router.get('/', (req, res)=>{
    res.send('user controllers work')
})

module.exports= router