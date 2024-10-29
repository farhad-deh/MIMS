const db = require("../dbConfig");

function getAllMaterials(req, res) {
  db.getConnection((err, connection) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "مشکلی در ارتباط با دیتابیس بوجود آمده است . " });
    }

    connection.query(
      `SELECT 
        materials.id AS material_id,
        materials.name AS material_name,
        materials.quantity,
        materials.created_at,
        suppliers.id AS supplier_id,
        suppliers.name AS supplier_name
      FROM materials
      JOIN suppliers ON suppliers.id = materials.supplier_id`,
      (err, rows) => {
        connection.release();

        if (err) {
          return res
            .status(500)
            .json({ message: "مشکلی در دریافت متریال ها بوجود آمده است ." });
        }

        res.json(rows);
      }
    );
  });
}

function getMaterialById(req, res) {
  const { id } = req.params;
  db.getConnection((err, connection) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "مشکلی در ارتباط با دیتابیس بوجود آمده است ." });
    }

    connection.query(
      `SELECT 
        materials.id AS material_id,
        materials.name AS material_name,
        materials.quantity,
        materials.created_at,
        suppliers.id AS supplier_id,
        suppliers.name AS supplier_name
      FROM materials
      JOIN suppliers ON suppliers.id = materials.supplier_id
      where materials.id = ?`,
      [id],
      (err, rows) => {
        connection.release();

        if (err) {
          return res.status(500).json({ message: "متریال مورد نظر پیدا نشد." });
        }

        res.json(rows);
      }
    );
  });
}

function createMaterial(req, res) {
  const { name, supplier_id, quantity } = req.body;

  db.getConnection((err, connection) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "مشکلی در ارتباط با دیتابیس بوجود آمده است ." });
    }

    connection.query(
      "INSERT INTO materials (name, supplier_id, quantity) VALUES (?, ?, ?)",
      [name, supplier_id, quantity],
      (err, result) => {
        connection.release();
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ message: "مشکلی در ایجاد ماده جدید پیش آمده است." });
        }
        res.status(201).json({
          message: "متریال جدید با موفقیت اضافه شد .",
          material_id: result.insertId,
        });
      }
    );
  });
}

function updateMaterial(req, res) {
  const { id } = req.params;
  const { name, supplier_id, quantity } = req.body;
  db.getConnection((err, connection) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "مشکلی در ایجاد متریال جدید پیش آمده است." });
    }
    connection.query(
      "UPDATE materials SET name = ?, supplier_id = ?, quantity = ? WHERE id = ?",
      [name, supplier_id, quantity, id],
      (err, result) => {
        connection.release();

        if (err) {
          return res
            .status(500)
            .json({ message: "مشکلی در به‌روزرسانی متریال پیش آمده است." });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "متریال مورد نظر پیدا نشد." });
        }

        res.json({ message: "متریال با موفقیت به روز شد . " });
      }
    );
  });
}

function deleteMaterial(req, res) {
  const { id } = req.params;
  db.getConnection((err, connection) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "مشکلی در ایجاد ماده جدید پیش آمده است." });
    }
    connection.query(
      "DELETE FROM materials WHERE id = ?",
      [id],
      (err, result) => {
        connection.release();

        if (err) {
          return res
            .status(500)
            .json({ message: "مشکلی در حذف متریال پیش آمده است." });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "متریال مورد نظر پیدا نشد." });
        }

        res.json({ message: "متریال با موفقیت حذف شد . " });
      }
    );
  });
}

module.exports = {
  getAllMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial,
};
