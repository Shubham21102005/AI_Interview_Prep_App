//Used to protect the routes so they ar not accesible to unauthorized users
const jwt= require('jsonwebtoken');
const User= require('../models/User.js')

const authenticateToken= async (req,res,next)=>{
    try {
        // Get token from Authorization header
        const authHeader= req.header('Authorization');
        const token = authHeader && authHeader.split(' ')[1];

        // Check if token exists
        if(!token) return res.status(401).json({message: 'Unauthorized'});

        // Verify the token
        const decoded= jwt.verify(token, process.env.JWT_SECRET);
        const user= await User.findById(decoded.userId).select('-password');

        // Check if user exists
        if(!user) return res.status(401).json({message: 'Unauthorized'});

        // Add user to request object for use in next middleware/route
        req.user= user;
        next();


    } catch (error) {
        // Handle JWT errors (invalid token, expired, etc.)
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
    
    // Handle other errors
        res.status(500).json({ 
            message: 'Server error during authentication',
            error: error.message 
        });
    }
}

module.exports= {authenticateToken};