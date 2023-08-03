const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
   
    username:{
        type: String,
        require:true,
        unique: true,
        max:10,
        min:3
    },
    email:{
        type: String,
        require:true,
        unique:true,
        max:15

    },
    password:{
        type: String,
        require:true,
        min:6
    }
},{timestamps:true});

 module.exports =mongoose.model('User',userSchema)