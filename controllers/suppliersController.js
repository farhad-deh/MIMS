const db = require("../dbConfig");

function getAllSuppliers(req, res) {
  db.getConnection((err, connection) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "مشکلی در ارتباط با دیتابیس بوجود آمده است . " });
    }

    connection.query("SELECT * FROM suppliers", (err, rows) => {
      connection.release();

      if (err) {
        return res.status(500).json({
          message: "مشکلی در دریافت تامین کننده ها بوجود آمده است .",
        });
      }

      res.json(rows);
    });
  });
}

function getSupplierById(req, res) {
  const { id } = req.params;
  db.getConnection((err, connection) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "مشکلی در ارتباط با دیتابیس بوجود آمده است ." });
    }

    connection.query(
      "SELECT * FROM suppliers where suppliers.id = ?",
      [id],
      (err, rows) => {
        connection.release();

        if (err) {
          return res
            .status(500)
            .json({ message: "تامین کننده مورد نظر پیدا نشد." });
        }

        res.json(rows);
      }
    );
  });
}

function createSupplier(req, res) {
  const { name, status } = req.body;

  db.getConnection((err, connection) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "مشکلی در ارتباط با دیتابیس بوجود آمده است ." });
    }

    connection.query(
      "INSERT INTO suppliers (name, status) VALUES (?, ?)",
      [name, status],
      (err, result) => {
        connection.release();
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ message: "مشکلی در ایجاد ماده جدید پیش آمده است." });
        }
        res.status(201).json({
          message: "تامین کننده جدید با موفقیت اضافه شد .",
          supplier_id: result.insertId,
        });
      }
    );
  });
}

function updateSupplier(req, res) {
  const { id } = req.params;
  const { name, status } = req.body;
  db.getConnection((err, connection) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "مشکلی در ایجاد تامین کننده جدید پیش آمده است." });
    }
    connection.query(
      "UPDATE suppliers SET name = ?, status = ? WHERE id = ?",
      [name, status, id],
      (err, result) => {
        connection.release();

        if (err) {
          return res.status(500).json({
            message: "مشکلی در به‌روزرسانی تامین کننده پیش آمده است.",
          });
        }

        if (result.affectedRows === 0) {
          return res
            .status(404)
            .json({ message: "تامین کننده مورد نظر پیدا نشد." });
        }

        res.json({ message: "تامین کننده با موفقیت به روز شد . " });
      }
    );
  });
}

function deleteSupplier(req, res) {
  const { id } = req.params;
  db.getConnection((err, connection) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "مشکلی در ایجاد ماده جدید پیش آمده است." });
    }
    connection.query(
      "DELETE FROM suppliers WHERE id = ?",
      [id],
      (err, result) => {
        connection.release();

        if (err) {
          return res
            .status(500)
            .json({ message: "مشکلی در حذف تامین کننده پیش آمده است." });
        }

        if (result.affectedRows === 0) {
          return res
            .status(404)
            .json({ message: "تامین کننده مورد نظر پیدا نشد." });
        }

        res.json({ message: "تامین کننده با موفقیت حذف شد . " });
      }
    );
  });
}

module.exports = {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
