//import mongoose and env

const mongoose = require("mongoose")
require("dotenv").config();


//connect to database

exports.connectDB = () => {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true

    })
    .then(() => {
        console.log("database connected")
    })
    .catch((err) => {
        console.error(err)
        console.log("DB CONNECTION FAILEd")
        process.exit(1);

    })
}


//export 

