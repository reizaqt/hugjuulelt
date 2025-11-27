const db = require("../db");

exports.createOrganization = async (req, res) => {
  const { org_name, org_address, email, phone } = req.body;

  try {
    const [userResult] = await db.query(
      "INSERT INTO users (role_id, phone, password_hash) VALUES (?, ?, ?)",
      [2, phone, "defaultHash123"]
    );
    const user_id = userResult.insertId;

    await db.query(
      "INSERT INTO organization (user_id, org_name, org_address, email) VALUES (?, ?, ?, ?)",
      [user_id, org_name, org_address, email]
    );

    res.json({ message: "Organization амжилттай үүслээ" });
  } catch (err) {
    console.error("Org CREATE ERROR:", err);
    res.status(500).json({ error: "DB алдаа" });
  }
};

exports.getOrganizations = async (req, res) => {
  try {
    const [results] = await db.query(
      `SELECT o.*, u.phone
       FROM organization o
       JOIN users u ON o.user_id = u.user_id`
    );
    res.json(results);
  } catch (err) {
    console.error("Org LIST ERROR:", err);
    res.status(500).json({ error: "DB алдаа" });
  }
};
