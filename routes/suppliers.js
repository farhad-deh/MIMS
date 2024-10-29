const express = require("express");
const router = express.Router();
const suppliersController = require("../controllers/suppliersController");

/**
 * @swagger
 * tags:
 *   - name: Suppliers
 *     description: "Endpoints related to suppliers"
 */

/**
 * @swagger
 * /suppliers:
 *   get:
 *     tags: [Suppliers]
 *     summary: دریافت لیست تامین کنندگان
 *     description: لیست تمام تامین کنندگان را از پایگاه داده دریافت می‌کند.
 *     responses:
 *       200:
 *         description: لیست تامین کنندگان
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "ABC Supplies"
 *                   status:
 *                     type: integer
 *                     example: 1  // 0 برای غیر فعال، 1 برای فعال
 *       500:
 *         description: خطا در ارتباط با پایگاه داده
 */
router.get("/", suppliersController.getAllSuppliers);

/**
 * @swagger
 * /suppliers/{id}:
 *   get:
 *     tags: [Suppliers]
 *     summary: دریافت یک تامین کننده با شناسه
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: شناسه تامین کننده
 *     responses:
 *       200:
 *         description: جزئیات تامین کننده
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "ABC Supplies"
 *                 status:
 *                   type: integer
 *                   example: 1  // 0 برای غیر فعال، 1 برای فعال
 *       404:
 *         description: تامین کننده پیدا نشد
 *       500:
 *         description: خطا در ارتباط با پایگاه داده
 */
router.get("/:id", suppliersController.getSupplierById);

/**
 * @swagger
 * /suppliers:
 *   post:
 *     tags: [Suppliers]
 *     summary: ایجاد یک تامین کننده جدید
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               status:
 *                 type: integer
 *                 description: "0 برای غیر فعال، 1 برای فعال"
 *     responses:
 *       201:
 *         description: تامین کننده با موفقیت ایجاد شد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "تامین کننده با موفقیت ایجاد شد"
 *                 supplier_id:
 *                   type: integer
 *                   example: 1
 *       500:
 *         description: مشکلی در ایجاد تامین کننده به وجود آمده است
 */
router.post("/", suppliersController.createSupplier);

/**
 * @swagger
 * /suppliers/{id}:
 *   put:
 *     tags: [Suppliers]
 *     summary: به‌روزرسانی یک تامین کننده با شناسه
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: شناسه تامین کننده برای به‌روزرسانی
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               status:
 *                 type: integer
 *                 description: "0 برای غیر فعال، 1 برای فعال"
 *     responses:
 *       200:
 *         description: تامین کننده با موفقیت به‌روزرسانی شد
 *       404:
 *         description: تامین کننده پیدا نشد
 *       500:
 *         description: مشکلی در به‌روزرسانی تامین کننده پیش آمده است
 */
router.put("/:id", suppliersController.updateSupplier);

/**
 * @swagger
 * /suppliers/{id}:
 *   delete:
 *     tags: [Suppliers]
 *     summary: حذف یک تامین کننده با شناسه
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: شناسه تامین کننده‌ای که می‌خواهید حذف کنید
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: تامین کننده با موفقیت حذف شد
 *       404:
 *         description: تامین کننده پیدا نشد
 */
router.delete("/:id", suppliersController.deleteSupplier);

module.exports = router;
