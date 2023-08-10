
const User = require("../models/User")
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

//register a new User
router.post('/register', async (req, res) => {

    try {

        //generate a new Password
        const saltRounds = 10; /// number of time a particular password is encrypted
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPassword = bcrypt.hashSync(req.body.password, salt);

        //creating a new user
        const newUser = new User({
            username: req.body.username,
            password: hashPassword,
            email: req.body.email
        })

        //saving into the database
        const user = await newUser.save()
        res.status(200).json(user._id)

    }
    catch (err) {
        console.log("Error in creating a new user:", err)
        res.status(500).json(err)
    }
})

//login
router.post('/login',async(req, res) => {

    try{
        //fund the user
        const user= await User.findOne({email: req.body.email})

        !user && res.status(400).json("Wrong Username or Password")

        //validate the user
        const validatePassword =await bcrypt.compare(
            req.body.password,
            user.password
        )
        !validatePassword && res.status(400).json("Wrong password")

        res.status(200).json(user)
    }
    catch (err) {
        res.status(500).json(err)
    }


})



module.exports = router