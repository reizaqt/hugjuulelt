const db = require('../db');

// GET all
const getAllCategories = (req, res) => {
  db.query('SELECT * FROM positions', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// CREATE
const createCategory = (req, res) => {
  const { position_name } = req.body;
  db.query(
    'INSERT INTO positions (position_name) VALUES (?)',
    [position_name],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, position_name });
    }
  );
};

// UPDATE
const updateCategory = (req, res) => {
  const { id } = req.params;
  const { position_name } = req.body;
  db.query(
    'UPDATE positions SET position_name=? WHERE position_id=?',
    [position_name, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id, position_name });
    }
  );
};

// DELETE
const deleteCategory = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM positions WHERE position_id=?', [id], (err) => {
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
