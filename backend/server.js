//This is our main entry point - like the front door of our application
const express= require('express');
const mongoose= require('mongoose')
const cors= require('cors')
const connectDB = require(`./config/database.js`)
const authRoutes= require('./routes/authRoutes.js')
const sessionRoutes= require('./routes/sessionRoutes.js')
const cookieParser = require('cookie-parser');


if (process.env.NODE_ENV !== 'production') {
  import('dotenv').then(dotenv => dotenv.config());
}

const app= express();
const PORT= process.env.PORT || 8080;

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://ai-interview-prep-app-zgox.vercel.app'  // ✅ Correct Vercel frontend URL
];

app.use(cors({
  origin: allowedOrigins, // Allow requests from your frontend
  credentials: true,               // Allow cookies and authorization headers
}));

app.use(express.json());
app.use(cookieParser());



//Routes
app.use('/api/auth',authRoutes);
app.use('/api/session',sessionRoutes);
app.use("/api/expand", require("./routes/expand.js"));


app.listen(PORT,async  ()=>{
    await connectDB()

    console.log(`Server is running on ${PORT}`);
    
})

