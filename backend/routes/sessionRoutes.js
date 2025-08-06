const express = require('express');
const router = express.Router();
const {
  createSession,
  getSessions,
  getSession,
  deleteSession,
  generateAdditionalQuestions
} = require('../controllers/sessionController.js');
const { authenticateToken } = require('../middleware/authMiddleware.js');

// All session routes are protected by authentication
router.post('/create', authenticateToken, createSession);           // Create a new session
router.get('/sessions', authenticateToken, getSessions);              // Get all sessions for the logged-in user
router.get('/:id', authenticateToken, getSession);            // Get a single session by ID
router.delete('/:id', authenticateToken, deleteSession);      // Delete a session by ID
router.post('/:id/generate-more', authenticateToken, generateAdditionalQuestions); // Generate additional questions

module.exports = router;
