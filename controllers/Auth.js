const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();
//signup route handler

exports.signup = async (req, res) => {
    try{
        ////fetch data

        const {name, email, password, role} = req.body;
        //check if user already exits
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        //secure passowrd

        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(error){
            return res.status(500).json({
                success: false,
                message: "Unable to hash password",
            });
        }

        //create new user
        const user = await User.create({
            name,email,password:hashedPassword,role
        })


        return res.status(200).json({
            success: true,
            message: "User created successfully",
            
        });

    }
    catch(error){
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "User cannot be registered",
        });
    }
}



//login 

exports.login = async (req,res) => {

    try{
        //data fetch
        const {email, password} = req.body;
        //validate
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please provide email and password",
            });
        }
        //check if user exists
        let user = await User.findOne({email});
        //if not a registered user
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not Registered"
            })
        }
        //verify passowrd and generate JWT Token
        const payload ={
            email:user.email,
            id:user._id,
            role:user.role
        };

        if(await bcrypt.compare(password,user.password) ){
            //matched
            let token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            })

            user = user.toObject();
            user.token = token;
            user.password = undefined;
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 *1000),
                httpOnly:true,

            }
            res.cookie("token" ,token ,options).status(200).json({
                success:true,
                user,
                token,
                message:"Login Successful"
            })

        }

        else{
            return res.status(403).json({
                success:false,
                message:"Password Incorrect"
            });
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Login Failure",
        })
    }
}