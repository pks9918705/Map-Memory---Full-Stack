const mongoose = require('mongoose');
const { Schema } = mongoose;

const pinSchema = new Schema({
   
    username:{
        type: String,
        require:true,
        max:10,
        min:3
    },
    title:{
        type: String,
        min:5,
    },
    description:{
        type: String,
        min:5,

    },
    rating:{
        type: Number,
        min:1,max:5
    },
    latitude:{
        type:Number,
        require:true,
    },
    longitude:{
        type:Number,
        require:true,
    }


},{timestamps:true});

 module.exports =mongoose.model('Pin',pinSchema)