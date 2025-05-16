const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401); throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401); throw new Error('Not authorized, no token');
  }
});

const admin = (req, res, next) => {
  if (req.user?.isAdmin) next();
  else { res.status(401); throw new Error('Not authorized as admin'); }
};

module.exports = { protect, admin };