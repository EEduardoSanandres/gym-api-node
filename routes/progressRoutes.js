const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { getProgress, createProgress, updateProgress, deleteProgress } = require("../controllers/progressController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Progress
 *   description: Endpoints for managing user exercise progress
 */

/**
 * @swagger
 * /api/progress:
 *   get:
 *     summary: Get all progress entries of the authenticated user
 *     tags: [Progress]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of progress entries
 */
router.get("/", protect, getProgress);

/**
 * @swagger
 * /api/progress:
 *   post:
 *     summary: Create a new progress entry
 *     tags: [Progress]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               exercise:
 *                 type: string
 *                 example: 60c72b2f9b1d8b001c8e4c1e
 *               sets:
 *                 type: integer
 *                 example: 4
 *               reps:
 *                 type: integer
 *                 example: 10
 *               weight:
 *                 type: number
 *                 example: 50
 *               unit:
 *                 type: string
 *                 enum: [kg, lbs]
 *                 example: kg
 *     responses:
 *       201:
 *         description: Progress entry successfully created
 *       400:
 *         description: Invalid data
 */
router.post("/", protect, createProgress);

/**
 * @swagger
 * /api/progress/{id}:
 *   put:
 *     summary: Update a progress entry
 *     tags: [Progress]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Progress ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sets:
 *                 type: integer
 *                 example: 5
 *               reps:
 *                 type: integer
 *                 example: 12
 *               weight:
 *                 type: number
 *                 example: 55
 *               unit:
 *                 type: string
 *                 enum: [kg, lbs]
 *                 example: kg
 *     responses:
 *       200:
 *         description: Progress entry updated successfully
 *       404:
 *         description: Progress not found
 */
router.put("/:id", protect, updateProgress);

/**
 * @swagger
 * /api/progress/{id}:
 *   delete:
 *     summary: Delete a progress entry
 *     tags: [Progress]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Progress ID
 *     responses:
 *       200:
 *         description: Progress entry deleted successfully
 *       404:
 *         description: Progress not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", protect, deleteProgress);

module.exports = router;