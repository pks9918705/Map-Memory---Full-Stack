const express = require('express');
const mongoose = require('mongoose');

//to hide the key of your database
const dotenv = require('dotenv'); // for hidding the sensitive information like key

const pinRoute = require('./routes/Pin');



const app = express();
dotenv.config()

app.use(express.json());

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

//! Routes

// Pin route 
app.use("/api/pins", pinRoute)


const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
