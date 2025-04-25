const blogModel = require("../models/blogModel");
const { exists } = require("../models/userModel");

const bloglist = async (req,res,next) => {
    const blogs = await blogModel.find()
        .populate('user_id', 'name')
        .lean();

    const blogsWithUserName = blogs.map(blog => ({
        ...blog,
        user_name: blog.user_id?.name || 'Unknown',
        user_ids: blog.user_id?._id || ''
    }));
    return res.status(201).json({blogsWithUserName,message:"Blog list get successfully",status:true});
}

const addblog = async (req,res,next) => {
    try {
        const {name,details} = req.body;
        if (!name) {
            return next('Plase Provide name');
        }
        if (!details) {
            return next('Plase Provide details');
        }
        
        const namecheck = await blogModel.findOne({name})
        if (namecheck) {
            return next('This blog is already exist');
        }
        
        const newBlog = new blogModel({
            name,
            details,
            user_id: req.user.userId
          });

          const savedBlog = await newBlog.save();
        
        return res.status(201).json({message:"New blog added successfully",status:true});
    } catch (error) {
        next(error);
    }
}

module.exports = {bloglist,addblog};