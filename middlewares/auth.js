/// authentication, authorization middleware isStudent , isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req,res,next) => {

    try{
        //extract jwt token

        console.log("cookie",req.cookies.token);
        console.log("body",req.body.token);

        //header wala sabse safe hai

        


        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ","");
        if(!token){
            return res.status(401).json({
                success: false,
                message: "No token provided",
            })
        }

        //verify the token
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(error){
            res.status(401).json({
                success:false,
                message:"Invalid token"
            })
        }
        next();
    }
    catch(error){

        return res.status(500).json({
            success: false,
            message: "Something went wrong in verifying",
        });
    }
}



exports.isStudent = (req,res,next) => {
    try{
        if(req.user.role !=="Student"){
            return res.status(401).json({
                success: false,
                message: "Unauthorized access - Protected route for students only",
            })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success: false,
            message: "Unauthorized access - User Role Not Matching",
        })
    }

}


exports.isAdmin = (req,res,next) => {
    try{
        if(req.user.role !=="Admin"){
            return res.status(401).json({
                success: false,
                message: "Unauthorized access - Protected route for admins only",
            })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success: false,
            message: "Unauthorized access - User Role Not Matching",
        })
    }
}