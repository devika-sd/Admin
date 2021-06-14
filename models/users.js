const mongoose=require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const schema=mongoose.Schema;

const UsersSchema=new schema({
    email:{
        type:String,
        require:true,
        unique: true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    address:{
        type:String
    },
    phonenumber:{
        type:Number
    },
    status:{
        type:String,
        enum:['active','blocked'],
        default:'active'
    }
});
UsersSchema.methods.generateToken = async function() {
    let token=await jwt.sign({_id:this._id,typeUser:this.typeUser},process.env.JWT_SECRET_KEY,{ expiresIn: '1h' });
    return token;
}

UsersSchema.methods.checkpassword = async function (rawpassword) {
    console.log("Inside a match password");
    return await bcrypt.compare(rawpassword,this.password);
}

UsersSchema.pre('save',async function () {
    console.log(this)
    console.log("before save operation  "+this.password);
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    console.log("after save method  ",this.password);

})
const Users=new mongoose.model('user',UsersSchema);
module.exports=Users;