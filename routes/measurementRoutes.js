const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { getMeasurements, createMeasurement, updateMeasurement, deleteMeasurement } = require("../controllers/measurementController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Measurements
 *   description: Endpoints for managing user body measurements
 */

/**
 * @swagger
 * /api/measurements:
 *   get:
 *     summary: Get all body measurements of the authenticated user
 *     tags: [Measurements]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of body measurements
 */
router.get("/", protect, getMeasurements);

/**
 * @swagger
 * /api/measurements:
 *   post:
 *     summary: Create a new body measurement entry
 *     tags: [Measurements]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               weight:
 *                 type: number
 *                 example: 70
 *               bodyFat:
 *                 type: number
 *                 example: 15
 *               waist:
 *                 type: number
 *                 example: 85
 *               chest:
 *                 type: number
 *                 example: 95
 *               arms:
 *                 type: number
 *                 example: 32
 *               thighs:
 *                 type: number
 *                 example: 55
 *     responses:
 *       201:
 *         description: Body measurement entry successfully created
 *       400:
 *         description: Invalid data
 */
router.post("/", protect, createMeasurement);

/**
 * @swagger
 * /api/measurements/{id}:
 *   put:
 *     summary: Update a body measurement entry
 *     tags: [Measurements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Measurement ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               weight:
 *                 type: number
 *                 example: 72
 *               bodyFat:
 *                 type: number
 *                 example: 14
 *               waist:
 *                 type: number
 *                 example: 84
 *               chest:
 *                 type: number
 *                 example: 96
 *               arms:
 *                 type: number
 *                 example: 33
 *               thighs:
 *                 type: number
 *                 example: 56
 *     responses:
 *       200:
 *         description: Body measurement entry updated successfully
 *       404:
 *         description: Measurement not found
 */
router.put("/:id", protect, updateMeasurement);

/**
 * @swagger
 * /api/measurements/{id}:
 *   delete:
 *     summary: Delete a body measurement entry
 *     tags: [Measurements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Measurement ID
 *     responses:
 *       200:
 *         description: Body measurement entry deleted successfully
 *       404:
 *         description: Measurement not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", protect, deleteMeasurement);

module.exports = router;