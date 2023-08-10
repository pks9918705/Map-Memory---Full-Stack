
const Pin=require("../models/Pin")
const express = require('express');
const router = express.Router();
//create a Pin
router.post('/',async(req,res)=>{
    console.log(req.body)
    const newPin=new Pin(req.body)
   

    //saving the new pin
    try{
        const savedPin = await newPin.save()
        res.status(200).json(savedPin)

    }
    catch(err){console.log("Error creating a new Pin:",err)
    res.status(500).json(err)     
}
})

//getting all pins
router.get('/',async(req, res)=>{

    try{
        const pins=await Pin.find()
        res.status(200).json(pins)
    }
    catch(err){console.log("Error:",err)}
})

module.exports =router