const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',   
  database: 'Hugjuulelt' 
});

// Нэвтрэх API
app.post('/login', (req, res) => {
  const { phone, password } = req.body;

  db.query('SELECT * FROM users WHERE phone = ?', [phone], async (err, results) => {
    if (err) return res.status(500).json({ error: 'DB алдаа' });
    if (results.length === 0) return res.status(401).json({ error: 'Хэрэглэгч олдсонгүй' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).json({ error: 'Нууц үг буруу' });

    // JWT үүсгэх
    const token = jwt.sign(
      { id: user.user_id, role: user.role },
      'secretKey123',   // 👉 production дээр .env ашиглана
      { expiresIn: '1h' }
    );

    res.json({ token, role: user.role });
  });
});

// Сервер асаах
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
