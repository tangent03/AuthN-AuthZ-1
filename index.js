const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 3000;

//add cookie-parser as a middleware
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());

require("./config/database").connectDB();

//mount routes 

const user = require("./routes/users");
app.use("/api/v1", user);

//activate

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})