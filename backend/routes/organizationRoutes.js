const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../db'); 
const JWT_SECRET = process.env.JWT_SECRET || 'secretKey123';

// create org
router.post('/', async (req, res) => {
    try {
        const { phone, password, org_name, org_address, email } = req.body;

        if (!phone || !password || !org_name || !org_address || !email) {
            return res.status(400).json({ error: "Бүх талбарыг бөглөнө үү" });
        }

        // create user
        const hash = await bcrypt.hash(password, 10);
        db.query(
            'INSERT INTO users (role_id, phone, password_hash) VALUES (?, ?, ?)',
            [1, phone, hash],
            (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'DB алдаа (users)' });
                }

                const user_id = result.insertId;

                // org
                db.query(
                    'INSERT INTO organization (user_id, org_name, org_address, email) VALUES (?, ?, ?, ?)',
                    [user_id, org_name, org_address, email],
                    (orgErr, orgRes) => {
                        if (orgErr) {
                            console.error(orgErr);
                            return res.status(500).json({ error: 'DB алдаа (organization)' });
                        }

                        res.json({
                            message: 'Organization амжилттай үүслээ',
                            user_id,
                            org_id: orgRes.insertId
                        });
                    }
                );
            }
        );

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Сервер алдаа' });
    }
});

// org list
router.get('/', (req, res) => {
    db.query('SELECT * FROM organization', (err, results) => {
        if (err) return res.status(500).json({ error: 'DB алдаа' });
        res.json(results);
    });
});

module.exports = router;
