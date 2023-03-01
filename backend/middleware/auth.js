const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  req.auth = { userId: jwt.verify(token, 'RANDOM_TOKEN_SECRET').userId };
  if (req.body.userId && req.body.userId !== req.auth.userId) 
  return res.status(401).json({ error: 'User ID non valable !' });
  next();
};