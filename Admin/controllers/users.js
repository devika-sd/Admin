const Users=require('../models/users');
const asyncHandler = require('../middleware/async');
const bcrypt = require('bcrypt');

// 4.Connection to db
console.log('attempting to connect')

const blockUser=asyncHandler(async(req,res,next)=>{
    const user=await Users.findOneAndUpdate({email: req.body.email}, {status: "blocked"},{
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

    if((match)&&(user.role === 'admin'))
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

const fetchAllUsers = asyncHandler(async (req, res) => {
   res.status(200).json(res.advancedResults)
})

const updateUserDetails = asyncHandler(async(req,res,next) => {

    let users = await Users.findByIdAndUpdate({_id: req.params._id},{password:req.body.password,address:req.body.address,phonenumber:req.body.phonenumber},{
        new: true,
        runValidators: true
    })
    console.log(users)
    if(!users) throw new Error(`Could not find user with id ${req.params._id}`)
    res.json({success:true, data: users});
    
})

const addUser = asyncHandler(async(req,res,next) => {
    //Operatons on model
    
        let user = await Users.create(req.body);
        console.log(user);
        res.status(201).json({success:true, data: user})
    })

const deleteUsersByEmail = asyncHandler(async(req,res,next)=>{
    let userDel = await Users.findOneAndDelete({ email: req.body.email})
    console.log(userDel)
    res.status(201).json({success: true, data:userDel})
})

module.exports={blockUser,adminSignin,fetchAllUsers,updateUserDetails,addUser,deleteUsersByEmail};