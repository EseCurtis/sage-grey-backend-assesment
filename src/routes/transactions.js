const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authenticateToken = require('../middleware/authenticateToken');

// Transfer funds (protected by token-based auth)
router.post('/transfer', authenticateToken, transactionController.transferFunds);

// Withdraw funds (protected by token-based auth)
router.post('/withdraw', authenticateToken, transactionController.withdrawFunds);

module.exports = router;