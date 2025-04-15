const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required'],
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        validate:validator.isEmail
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minlength:[6,'Password length should be greter then 6 charactor'],
        select:true,
    },
    country_code:{
        type:String,
        default:'+91',
    },
    mobile_no:{
        type:String,
        // required:[true,'Mobile no is required'],
    }
},
{
    timestamps:true
}
);

//middleware
userSchema.pre('save',async function(){
    if (!this.isModified) { return }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

//create JWT Token
userSchema.methods.createJWT = function(){
    return JWT.sign({userId:this._id},process.env.JWT_SECRET,{expiresIn:'1d'});
}

//compare password
userSchema.methods.comparePassword = async function(userPassword){
    const isMatch = await bcrypt.compare(userPassword,this.password);
    return isMatch;
}

module.exports = mongoose.model('users',userSchema);