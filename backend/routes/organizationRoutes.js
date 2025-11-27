const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { allowRoles } = require('../middleware/roleCheck');
const db = require('../db');

// Create organization
router.post('/', authenticateToken, allowRoles('superadmin'), async (req, res) => {
  const { org_name, org_address, email, phone } = req.body;
  try {
    // create user
    const [result] = await db.query(
      'INSERT INTO users (role_id, phone, password_hash) VALUES (?, ?, ?)',
      [2, phone, 'defaultHash123'] // default password
    );
    const user_id = result.insertId;

    // create organization
    await db.query(
      'INSERT INTO organization (user_id, org_name, org_address, email) VALUES (?, ?, ?, ?)',
      [user_id, org_name, org_address, email]
    );

    res.json({ message: 'Organization амжилттай үүслээ' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB алдаа' });
  }
});

// List organizations
router.get('/', authenticateToken, allowRoles('superadmin'), async (req, res) => {
  try {
    const [results] = await db.query(
      `SELECT o.*, u.phone
       FROM organization o
       JOIN users u ON o.user_id = u.user_id`
    );
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB алдаа' });
  }
});

// Update organization
router.put('/:id', authenticateToken, allowRoles('superadmin'), async (req, res) => {
  const { id } = req.params;
  const { org_name, org_address, email, phone } = req.body;

  try {
    // Update organization
    await db.query(
      'UPDATE organization SET org_name=?, org_address=?, email=? WHERE org_id=?',
      [org_name, org_address, email, id]
    );

    // Update user phone
    await db.query(
      'UPDATE users u JOIN organization o ON u.user_id=o.user_id SET u.phone=? WHERE o.org_id=?',
      [phone, id]
    );

    res.json({ message: 'Organization амжилттай шинэчлэгдлээ' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB алдаа' });
  }
});

// Delete organization
router.delete('/:id', authenticateToken, allowRoles('superadmin'), async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE o, u FROM organization o JOIN users u ON o.user_id=u.user_id WHERE o.org_id=?', [id]);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB алдаа' });
  }
});

module.exports = router;
