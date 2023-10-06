const transactionModel = require('../models/transactionModel');

// Function to transfer funds between two user accounts
async function transferFunds(req, res) {
  try {
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;
    const amount = req.body.amount;

    // Check if senderId, receiverId, and amount are provided in the request body
    if (!senderId || !receiverId || typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    const result = await transactionModel.transferFunds(senderId, receiverId, amount);

    if (result === true) {
      res.status(200).json({ message: 'Funds transferred successfully' });
    } else if (result === false) {
      res.status(404).json({ message: 'Sender, receiver, or insufficient balance' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  } catch (error) {
    console.error('Error transferring funds:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  transferFunds,
};
