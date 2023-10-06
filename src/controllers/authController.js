const userModel = require('../models/userModel');

async function authenticateUser(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const authed_user = await userModel.authUser(username, password);

    if (authed_user) {

      res.status(201).json({ token: process.env.TOKEN });
      
    } else {
      res.status(401).json({ message: 'Authentication failed' });
    }
  }
  
  module.exports = {
    authenticateUser,
  };
  