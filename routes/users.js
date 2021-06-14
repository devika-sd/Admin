const express=require('express');
const router=express.Router();
const {blockUser,adminSignin}=require('../controllers/users');
const {protect,authorize} = require('../middleware/auth');
var advancedFind =require('../middleware/Advancedfind');
const Users=require('../models/users');


router.route('/')
.get(protect,authorize('trainer','admin'),advancedFind(Users),getUsers);


module.exports=router;