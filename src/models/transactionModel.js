const { MongoClient, ObjectId } = require('mongodb');
const DATABASE_URL = process.env.MONGODB_URL;

async function connectToDatabase() {
  const client = new MongoClient(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    return client.db();
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

// Function to transfer funds between two user accounts
async function transferFunds(senderId, receiverId, amount) {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection('users');

    // Check if sender has sufficient balance
    const sender = await usersCollection.findOne({ _id: new ObjectId(senderId) });
    if (!sender || sender.balance < amount) {
      return false; // Insufficient balance or sender not found
    }

    // Deduct funds from sender's account
    const updatedSenderBalance = sender.balance - amount;
    await usersCollection.updateOne({ _id: new ObjectId(senderId) }, { $set: { balance: updatedSenderBalance } });

    // Add funds to receiver's account
    const receiver = await usersCollection.findOne({ _id: new ObjectId(receiverId) });
    if (!receiver) {
      return false; // Receiver not found
    }

    const updatedReceiverBalance = receiver.balance + amount;
    await usersCollection.updateOne({ _id: new ObjectId(receiverId) }, { $set: { balance: updatedReceiverBalance } });

    // Create a transaction record (optional)

    return true; // Funds transferred successfully
  } catch (error) {
    console.error('Error transferring funds:', error);
    throw error;
  }
}

module.exports = {
  transferFunds,
};
