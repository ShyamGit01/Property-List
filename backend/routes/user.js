const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/UserModel");

router.get("/", async (req, res) => {
    try{
        const users = await UserModel.find();
        res.status(200).json({
            status : 0,
            message : "User Data Fetch Successfully",
            data : users
        })
    } catch(error){
        res.status(400).json({
            status : 1,
            message : error
        })
    }
})

router.post("/register", async (req, res) => {
    // check emai exixt in db or not
    const emailExist = await UserModel.findOne({
        email : req.body.email
    });
    if (emailExist) 
    {   
        return res.status(400).json({
            status : 1,
            message : "Email Already exists.."
        })
    }
    
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new UserModel({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword,
        type : req.body.type
    });

    try{
        const savedUser = await user.save();
        res.status(200).json({
            status : 1,
            message : "Registration Success..",
            data : savedUser
        })
    } catch(error){
        res.status(400).json({
            status : 1,
            message : error
        })
    }
})

router.post("/login", async (req, res) => {
    // check emai exixt in db or not
    const user = await UserModel.findOne({email : req.body.email});
    if(!user){
        return res.status(400).json({
            status : 1,
            message : "User not found"
        })
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass){
        return res.status(400).json({
            status : 1,
            message : "Invalid Password"
        })
    }

    // assign token
    const token = jwt.sign({_id : user._id}, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send({token : token})
})
module.exports = router;
