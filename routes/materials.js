const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /materials:
 *   get:
 *     summary: Get a list of materials
 *     description: Retrieve a list of materials from the database.
 *     responses:
 *       200:
 *         description: Successful response with a list of materials.
 */
router.get("/", (req, res) => {
  res.send("List of materials");
});

module.exports = router;