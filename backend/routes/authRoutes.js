const { register,login } = require("../controllers/authController");
const express= require("express");
const { authenticateToken } = require('../middleware/authMiddleware.js');


const router= express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/check', authenticateToken, async (req, res) => {
  try {
    const user = req.user; // populated from middleware
    if (!user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    res.json({ user }); // send back the user info
  } catch (err) {
    console.error('Check auth error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports= router;
