
function authenticateToken(req, res, next) {
    const fauxToken = req.headers.authorization;

    if (!fauxToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    if (fauxToken !== process.env.TOKEN) {
      return res.status(403).json({ message: 'Forbidden' });
    }
  
    next();
  }
  
  module.exports = authenticateToken;
  