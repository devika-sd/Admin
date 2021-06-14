const Users=require('../models/users');
const asyncHandler = require('../middleware/async');
const bcrypt = require('bcrypt');

// 4.Connection to db
console.log('attempting to connect')

const blockUser=asyncHandler(async(req,res,next)=>{
    const user=await Users.findOneAndUpdate({email: req.params.email}, {status: "blocked"},{
        new:true,
        runValidators: true
    })
    res.json({success:true,message:"user is blocked successfully",user});
})
const adminSignin=asyncHandler(async(req,res,next)=>{
    const user=await Users.findOne({email: req.body.email});
    console.log("login details"+user);

    //compare password with hashed password
    const match = await user.checkpassword(req.body.password);

    if(match)
    {
        let token = await user.generateToken();
        // console.log(token);
        res.json({status:true,message:"SignIn successfull",token,role:user.typeUser,userid:user._id});
    }
    else
    {
        res.json({status:false,message:"invalid email / password"});
    }
})

module.exports={blockUser,adminSignin};