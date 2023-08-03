const mongoose = require('mongoose');
const { Schema } = mongoose;

const pinSchema = new Schema({
   
    username:{
        type: String,
        require:true,
        unique: true,
        max:10,
        min:3
    },
    title:{
        type: String,
        min:5,
    },
    desc:{
        type: String,
        min:5,

    },
    rating:{
        type: Number,
        min:1,max:5
    },
    lat:{
        type:Number,
        require:true,
    },
    long:{
        type:Number,
        require:true,
    }


},{timestamps:true});

 module.exports =mongoose.model('Pin',pinSchema)