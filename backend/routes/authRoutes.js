const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db'); 

// Login
router.post('/login', (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password)
    return res.status(400).json({ error: 'phone болон password шаардлагатай' });

  db.query(
    `SELECT u.user_id, u.password_hash, r.role_name
     FROM users u
     JOIN user_role r ON u.role_id = r.role_id
     WHERE u.phone = ?`,
    [phone]
  ).then(async ([results]) => {
    if (results.length === 0) return res.status(401).json({ error: 'Хэрэглэгч олдсонгүй' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ error: 'Нууц үг буруу' });

    // JWT
    const payload = { id: user.user_id, role: user.role_name };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, role: user.role_name });
  }).catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Сервер алдаа' });
  });
});

module.exports = router;
