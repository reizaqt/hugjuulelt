// // middleware/auth.js
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader?.split(' ')[1];
//   if (!token) return res.status(401).json({ error: 'Token байхгүй' });

//   jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
//     if (err) return res.status(403).json({ error: 'Token буруу эсвэл хугацаа дууссан' });
//     req.user = payload; // { userId, roleId }
//     next();
//   });
// }

// module.exports = { authenticateToken };


const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token байхгүй' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token буруу эсвэл хугацаа дууссан' });
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
