const express = require('express');
const mongoose = require('mongoose');

//to hide the key of your database
const dotenv = require('dotenv');


const app = express();
dotenv.config()

//connecting to Mongoose
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to Mongoose....")
    })
    .catch((err) => {
        console.log('Error DB connection error:', err);

    })


const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
