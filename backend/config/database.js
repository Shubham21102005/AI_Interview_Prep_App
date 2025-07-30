//Function to connect database to the server
const mongoose= require('mongoose');
const dotenv= require('dotenv');

dotenv.config();

const MONGODB_URI= process.env.MONGODB_URI;

const connectDB= async ()=>{
    try {
        await mongoose.connect(MONGODB_URI)
        console.log('Connected to database');
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports= connectDB;