const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken');

// Create a user account
router.post('/', userController.createUser);

// Get user details (protected by token-based auth)
router.get('/:id', authenticateToken, userController.getUserById);

// Fund user account (protected by token-based auth)
router.post('/fund', authenticateToken, userController.fundUserById);

// Withdraw from user account (protected by token-based auth)
router.post('/withdraw', authenticateToken, userController.withdrawFromUserById);

module.exports = router;
