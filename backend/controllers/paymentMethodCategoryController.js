const db = require('../db');

// GET all
const getAllCategories = (req, res) => {
  db.query('SELECT * FROM payment_method', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// CREATE
const createCategory = (req, res) => {
  const { method_name } = req.body;
  db.query(
    'INSERT INTO payment_method (method_name) VALUES (?)',
    [method_name],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, method_name });
    }
  );
};

// UPDATE
const updateCategory = (req, res) => {
  const { id } = req.params;
  const { method_name } = req.body;
  db.query(
    'UPDATE payment_method SET method_name=? WHERE method_id=?',
    [method_name, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id, method_name });
    }
  );
};

// DELETE
const deleteCategory = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM payment_method WHERE method_id=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.sendStatus(204);
  });
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
};
