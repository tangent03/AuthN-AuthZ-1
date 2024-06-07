const express = require("express");
const router = express.Router();

//import controllers
const {login, signup} = require("../controllers/Auth");
const {auth,isStudent,isAdmin} = require("../middlewares/auth");

//mountroute
router.post("/login", login);
router.post("/signup", signup);

router.get("/test", auth , (req,res) => {
    res.json({
        success:true,
        message:"Welcome to the Protected Route for tests"
    })
})
//Protected Route
router.get("/student",auth , isStudent, (req,res) => {
    res.json({
        success:true,
        message:"Welcome to the Protected Route For Students"
    })
})

router.get("/admin" ,auth,isAdmin, (req,res) => {
    res.json({
        success:true,
        message:"Welcome to the Protected Route For Students"
    });
})

module.exports = router;