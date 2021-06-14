const express=require('express');
const router=express.Router();
const {blockUser,adminSignin,fetchAllUsers,addUser,updateUserDetails,deleteUsersByEmail}=require('../controllers/users');
const {protect,authorize} = require('../middleware/auth');
var advancedFind =require('../middleware/Advancedfind');
const Users=require('../models/users');


router.route('/login')
.post(adminSignin);

router.route('/block')
.patch(protect,authorize('admin'),blockUser);

router.route('/')
.get(protect,advancedFind(Users), fetchAllUsers)
.post(protect,authorize('admin'),addUser)
.delete(protect,authorize('admin'),deleteUsersByEmail)

router.route('/:_id')
.put(protect,authorize('admin'),updateUserDetails);


module.exports=router;