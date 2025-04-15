const userModel = require("../models/userModel");

const login = async (req,res,next) => {
    try {
        const {email,password} = req.body;
        if (!email || !password) {
            next('Plase Provide login details');
        }
       
        const user = await userModel.findOne({email})
        if (!user) {
            next('This email is already not exits');
        }

        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            next('invalida email and passwortd');
        }
       const token = user.createJWT();

        return res.status(201).json({message:"Login successfully",success:true,
            user:{
                name:user.name,
                email:user.email,
                country_code:user.country_code,
                mobile_no:user.mobile_no,
                token:token,
            }
        });
    } catch (error) {
        next(error);
    }
}
const signup = async (req,res,next) => {
    try {
        const {name,email,mobile_no,password} = req.body;
        if (!name) {
            next('Plase Provide name');
        }
        if (!email) {
            next('Plase Provide email');
        }
        if (!password) {
            next('Plase Provide password');
        }
        if (!mobile_no) {
            next('Plase Provide mobile no');
        }
        const emailcheck = await userModel.findOne({email})
        if (emailcheck) {
            next('This email is already exist');
        }

        const user = await userModel.create({name,email,mobile_no,password});
        const token = user.createJWT();
        return res.status(201).json({message:"New user added successfully",status:true,
            user:{
                name:user.name,
                email:user.email,
                country_code:user.country_code,
                mobile_no:user.mobile_no,
                token:token,
            }
        });
    } catch (error) {
        next(error);
    }
}


module.exports = {login,signup};