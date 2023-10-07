const { MongoClient, ObjectId } = require('mongodb');
const { comparePasswords } = require('../utils/_bycrypt');
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

// Function to create a user
async function createUser(user) {
  const db = await connectToDatabase();
  const usersCollection = db.collection('users');
  const result = await usersCollection.insertOne({ timestamp: new Date(), ...user });

  return result;
}

// Function to fetch a user by ID
async function getUserById(userId) {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection('users');

    // Find the user by their ObjectId (assuming "_id" is an ObjectId)
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    
    return user;
  } catch (error) {
    //console.error('Error fetching user by ID:', error);
    throw error;
  }
}

async function getUserByUsername(username) {
  const db = await connectToDatabase();
  const usersCollection = db.collection('users');
  const user = await usersCollection.findOne({ username });

  return user;
}


async function authUser(username, password) {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection('users');

    // Find the user by their ObjectId (assuming "_id" is an ObjectId)
    const user = await usersCollection.findOne({ username });

    if(await comparePasswords(password, user.password)) {
      return user;
    } else {
      new Error("Error trying to auth user")
    }
  } catch (error) {
    console.error('Error trying to auth user', error);
    throw error;
  }
}



// Function to update a user's balance
async function updateUserBalance(userId, newBalance) {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection('users');

    // Update the user's balance in the database
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { balance: newBalance } }
    );

    if (result.modifiedCount === 1) {
      return true; // Successfully updated user's balance
    } else {
      return false; // User not found or balance not updated
    }
  } catch (error) {
    console.error('Error updating user balance:', error);
    throw error;
  }
}

module.exports = {
  createUser,
  getUserById,
  getUserByUsername,
  authUser,
  updateUserBalance,
};
