const userModel = require("../models/userModel");

const userlist = async (req,res,next) => {
    return res.status(201).json({message:"User list ger successfully",status:true});
}

const updateUser = async (req,res,next) => {
    const {name,email,mobile_no,password} = req.body;
    if (!name || !email || !mobile_no) {
        next('Plase Provide all fields');
    }
    const user = await userModel.findOne({_id:req.user.userId});
    user.name = name;
    user.email = email;
    user.mobile_no = mobile_no;
    user.save();
    
    return res.status(201).json({message:"User update successfully",status:true});
}

const searchUser = async (req,res,next) => {
    const {search,sort,page,limit} = req.body;

    const queryObj = {};

    if (search) {
        queryObj.name ={$regex:search,$options:'i'}
    }
    
    
    let queryResult = userModel.find(queryObj);

    if (sort === 'desc') {
        queryResult = queryResult.sort('-createdAt')
    }
    if (sort === 'asc') {
        queryResult = queryResult.sort('createdAt')
    }
    if (sort === 'A-Z') {
        queryResult = queryResult.sort('name')
    }
    if (sort === 'Z-A') {
        queryResult = queryResult.sort('-name')
    }

    const pages = Number(page) || 1
    const limits = Number(limit) || 1
    const skip = (pages - 1) * limits
    console.log(pages)
    console.log(limits)
    queryResult = queryResult.skip(skip).limit(limits)

    //total count
    const totalUsers = await userModel.countDocuments(queryResult)
    const noOfPage = Math.ceil(totalUsers / limits)

    const user = await queryResult;
    return res.status(201).json({noOfPage,user,message:"User search get successfully",status:true});
}


module.exports = {userlist,updateUser,searchUser};