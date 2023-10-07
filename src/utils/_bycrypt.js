const bcrypt = require('bcryptjs');

// Function to encrypt a password
async function encryptPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw error;
  }
}

// Function to compare a password with its hash
async function comparePasswords(password, hash) {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  encryptPassword,
  comparePasswords,
};
