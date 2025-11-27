const db = require('../db');

// GET all
const getAllCategories = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM positions");
    res.json(rows);
  } catch (err) {
    console.error("GET ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// CREATE
const createCategory = async (req, res) => {
  const { position_name } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO positions (position_name) VALUES (?)",
      [position_name]
    );

    res.json({
      position_id: result.insertId,
      position_name
    });
  } catch (err) {
    console.error("CREATE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { position_name } = req.body;

  try {
    await db.query(
      "UPDATE positions SET position_name=? WHERE position_id=?",
      [position_name, id]
    );

    res.json({
      position_id: id,
      position_name
    });
  } catch (err) {
    console.error("UPDATE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// DELETE
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM positions WHERE position_id=?", [id]);
    res.sendStatus(204);
  } catch (err) {
    console.error("DELETE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
