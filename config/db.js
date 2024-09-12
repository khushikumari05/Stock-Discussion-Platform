const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectToDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongodb connected successfully");
    } catch (err){
        console.error("Mongodb connection failure");
        console.error(error);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectToDB;