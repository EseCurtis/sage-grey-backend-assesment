const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Simulated token-based authentication
router.post('/', authController.authenticateUser);

module.exports = router;
