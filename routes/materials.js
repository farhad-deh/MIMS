const express = require("express");
const router = express.Router();
const validateMaterialId = require("../middlewares/validateMaterialId");
const materialsController = require("../controllers/materialsController");

/**
 * @swagger
 * tags:
 *   - name: Materials
 *     description: "Endpoints related to materials"
 */

/**
 * @swagger
 * /materials:
 *   get:
 *     tags: [Materials]
 *     summary: دریافت لیست متریال و تامین کننده
 *     description: لیست متریال ها همراه با مشخصات تامین کننده.
 *     responses:
 *       200:
 *         description: لیست متریال ها همراه با مشخصات تامین کننده
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   material_id:
 *                     type: integer
 *                     example: 1
 *                   material_name:
 *                     type: string
 *                     example: "Steel Rod"
 *                   quantity:
 *                     type: integer
 *                     example: 100
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-10-30T08:15:30Z"
 *                   supplier_id:
 *                     type: integer
 *                     example: 2
 *                   supplier_name:
 *                     type: string
 *                     example: "ABC Supplies"
 *       500:
 *         description: خطا در دریافت لیست متریال ها
 */
router.get("/", materialsController.getAllMaterials);

/**
 * @swagger
 * /materials/{id}:
 *   get:
 *     tags: [Materials]
 *     summary: دریافت یک متریال با شناسه
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: شناسه متریال
 *     responses:
 *       200:
 *         description: متریال همراه با مشخصات تامین کننده
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 material_id:
 *                   type: integer
 *                   example: 1
 *                 material_name:
 *                   type: string
 *                   example: "Steel Rod"
 *                 quantity:
 *                   type: integer
 *                   example: 100
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-10-30T08:15:30Z"
 *                 supplier_id:
 *                   type: integer
 *                   example: 2
 *                 supplier_name:
 *                   type: string
 *                   example: "ABC Supplies"
 *       404:
 *         description: متریال پیدا نشد
 *       500:
 *         description: مشکل در ارتباط با دیتابیس
 */
router.get("/:id", validateMaterialId, materialsController.getMaterialById);

/**
 * @swagger
 * /materials:
 *   post:
 *     tags: [Materials]
 *     summary: ایجاد یک متریال جدید
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               material_name:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               supplier_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: متریال جدید با موفقیت ایجاد شد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: متریال جدید با موفقیت ایجاد شد
 *                 material_id:
 *                   type: integer
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       500:
 *         description: مشکلی در ایجاد متریال جدید به وجود امده است
 */
router.post("/", materialsController.createMaterial);

/**
 * @swagger
 * /materials/{id}:
 *   put:
 *     tags: [Materials]
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
 *               material_name:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               supplier_id:
 *                 type: integer
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
 *     tags: [Materials]
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
