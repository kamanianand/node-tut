const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const blogSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required'],
    },
    details:{
        type:String,
        required:[true,'Name is required'],
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
},
{
    timestamps:true
}
);


module.exports = mongoose.model('Blog',blogSchema);