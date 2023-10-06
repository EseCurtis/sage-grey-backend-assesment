const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken');

// Create a user account
router.post('/', userController.createUser);

// Get user details (protected by token-based auth)
router.get('/:id', authenticateToken, userController.getUserById);

// Get user details (protected by token-based auth)
router.get('/fund', authenticateToken, userController.fundUserById);

module.exports = router;
