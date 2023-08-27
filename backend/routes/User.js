
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
        return res.redirect('/login')
    }
})

//login
//login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
  
    if (!user) {
      return res.status(400).json("Wrong Username or Password");
    }
  
    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
  
    if (!validatePassword) {
      return res.status(400).json("Wrong password");
    }
  
    // Setting a cookie named "user_id" with the value of user's id
    res.cookie('user_id', user.id);
  
    // Sending a success response to the frontend
    res.status(200).json({ username: user.username }); // Sending username back to frontend
  }
  catch (err) {
      res.status(500).json(err);
    }
  });



// endpoint for getting the user based on the userid in cookie
  
  router.get('/:user_id', async (req, res) => {
    try {
      const user = await User.findById(req.params.user_id); // Assuming you're using Mongoose
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return user information
      return res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user information:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  


module.exports = router