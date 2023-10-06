const userModel = require('../models/userModel');

// Function to create a user
async function createUser(req, res) {
  try {
    const user = await userModel.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Function to get user details by ID
async function getUserById(req, res) {
  try {
    const userId = req.params.id;
    const user = await userModel.getUserById(userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error('Error getting user by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function fundUserById(req, res) {
  
}

module.exports = {
  createUser,
  getUserById,
  fundUserById
};
