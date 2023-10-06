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

// Function to create a user
async function createUser(user) {
  const db = await connectToDatabase();
  const usersCollection = db.collection('users');
  console.log(user)
  const result = await usersCollection.insertOne({ timestamp: new Date(), ...user});

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
    console.error('Error fetching user by ID:', error);
    throw error;
  }
}

// Function to create a user
async function fundUserById(user) {
  
}

module.exports = {
  createUser,
  getUserById,
  fundUserById,
};
