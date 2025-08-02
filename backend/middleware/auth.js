// backend/middleware/auth.js

const jwt = require('jsonwebtoken');

/**
 * Middleware to protect routes
 * Checks for JWT in header, verifies it, and attaches user to req
 */
module.exports = function (req, res, next) {
  // Get token from header: Authorization: Bearer <token>
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // If no token, deny access
  if (!token) {
    return res.status(401).json({ msg: 'No token, access denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // { id: 'user-id-here' }
    next(); // ✅ Proceed to the route handler
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};