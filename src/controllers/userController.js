const userModel = require('../models/userModel');

// Function to create a user
async function createUser(req, res) {
  try {
    const user = await userModel.createUser(req.body);
    res.status(201).json({ username: req.body.username, password: req.body.password, ...user});
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
    //console.error('Error getting user by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Function to fund a user's account by ID
async function fundUserById(req, res) {
  try {
    const userId = req.body.id;
    const amount = req.body.amount; // Assuming the amount to be funded is sent in the request body

    // Check if the user exists
    const user = await userModel.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the amount is valid (you can add more validation)
    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    // Add the amount to the user's balance
    user.balance += amount;

    // Update the user's balance in the database
    await userModel.updateUserBalance(userId, user.balance);

    res.status(200).json({ message: 'Funds added successfully', balance: user.balance });
  } catch (error) {
    console.error('Error funding user by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createUser,
  getUserById,
  fundUserById,
};
