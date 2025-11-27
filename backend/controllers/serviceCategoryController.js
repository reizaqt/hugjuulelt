const db = require('../db');

// GET all categories
const getAllCategories = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM service_category");
    res.json(rows);
  } catch (err) {
    console.error("DB ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// CREATE
const createCategory = async (req, res) => {
  const { sc_name, sc_desc } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO service_category (sc_name, sc_desc) VALUES (?, ?)",
      [sc_name, sc_desc]
    );

    res.json({ sc_id: result.insertId, sc_name, sc_desc });
  } catch (err) {
    console.error("CREATE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { sc_name, sc_desc } = req.body;

  try {
    await db.query(
      "UPDATE service_category SET sc_name=?, sc_desc=? WHERE sc_id=?",
      [sc_name, sc_desc, id]
    );

    res.json({ sc_id: id, sc_name, sc_desc });
  } catch (err) {
    console.error("UPDATE ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// DELETE
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM service_category WHERE sc_id=?", [id]);
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
