function authenticateUser(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    if (username === 'demo' && password === 'password') {
      res.json({ token: 'your-faux-token' });
    } else {
      res.status(401).json({ message: 'Authentication failed' });
    }
  }
  
  module.exports = {
    authenticateUser,
  };
  