//This is our main entry point - like the front door of our application
const express= require('express');
const mongoose= require('mongoose')
const cors= require('cors')
const dotenv= require('dotenv')
const connectDB = require(`./config/database.js`)
const authRoutes= require('./routes/authRoutes.js')
const sessionRoutes= require('./routes/sessionRoutes.js')
const cookieParser = require('cookie-parser');



dotenv.config();
const app= express();
const PORT= process.env.PORT || 8080;

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend
  credentials: true,               // Allow cookies and authorization headers
}));

app.use(express.json());
app.use(cookieParser());



//Routes
app.use('/api/auth',authRoutes);
app.use('/api/session',sessionRoutes);


app.listen(PORT,async  ()=>{
    await connectDB()

    console.log(`Server is running on ${PORT}`);
    
})
