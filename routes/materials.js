const express = require("express");
const router = express.Router();
const validateMaterialId = require("../middlewares/validateMaterialId");
const materialsController = require("../controllers/materialsController");

/**
 * @swagger
 * /materials:
 *   get:
 *     summary: دریافت لیست متریال
 *     responses:
 *       200:
 *         description: لیست متریال.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   quantity:
 *                     type: integer
 *                   supplier:
 *                     type: string
 *       500:
 *         description: Error retrieving materials.
 */
router.get("/", materialsController.getAllMaterials);

/**
 * @swagger
 * /materials/{id}:
 *   get:
 *     summary: دریافت یک متریال با شناسه
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: شناسه ی متریال در لیست .
 *         schema:
 *           type: integer
 *           example: 1  # Example of a valid ID
 *     responses:
 *       200:
 *         description: یک متریال.
 *       404:
 *         description: متریال پیدا نشد.
 *       500:
 *         description: مشکلی در دریافت متریال پیش آمده است.
 */
router.get("/:id", validateMaterialId, materialsController.getMaterialById);

/**
 * @swagger
 * /materials:
 *   post:
 *     summary: ایجاد یک ماده جدید
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               supplier:
 *                 type: string
 *     responses:
 *       201:
 *         description: متریال با موفقیت ایجاد شد.
 *       500:
 *         description: مشکلی در ایجاد متریال پیش آمده است.
 */
router.post("/", materialsController.createMaterial);

/**
 * @swagger
 * /materials/{id}:
 *   put:
 *     summary: به‌روزرسانی یک متریال با شناسه
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: شناسه ی متریال برای به‌روزرسانی.
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
 *               quantity:
 *                 type: integer
 *               supplier:
 *                 type: string
 *     responses:
 *       200:
 *         description: متریال با موفقیت به‌روزرسانی شد.
 *       404:
 *         description: متریال پیدا نشد.
 *       500:
 *         description: مشکلی در به‌روزرسانی متریال پیش آمده است.
 */
router.put("/:id", materialsController.updateMaterial);

/**
 * @swagger
 * /materials/{id}:
 *   delete:
 *     summary: حذف یک متریال با شناسه
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: شناسه ی متریال ای که می خواهید حذف کنید.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: متریال با موفقیت حذف شد.
 *       404:
 *         description: متریال پیدا نشد.
 */
router.delete("/:id", materialsController.deleteMaterial);

module.exports = router;
