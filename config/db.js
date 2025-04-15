const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        // console.log("DB Connected")
    } catch (error) {
        console.log("DB Connection error : "+error)
    }
}

module.exports = connectDB;