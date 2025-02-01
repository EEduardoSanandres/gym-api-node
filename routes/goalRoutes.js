const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { getGoals, createGoal, updateGoalProgress, deleteGoal } = require("../controllers/goalController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Goals
 *   description: Endpoints for managing user goals
 */

/**
 * @swagger
 * /api/goals:
 *   get:
 *     summary: Get all goals of the authenticated user
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of goals
 */
router.get("/", protect, getGoals);

/**
 * @swagger
 * /api/goals:
 *   post:
 *     summary: Create a new goal
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [weightLoss, muscleGain, endurance, strength]
 *                 example: weightLoss
 *               targetValue:
 *                 type: number
 *                 example: 10
 *               deadline:
 *                 type: string
 *                 format: date
 *                 example: 2023-12-31
 *     responses:
 *       201:
 *         description: Goal successfully created
 *       400:
 *         description: Invalid data
 */
router.post("/", protect, createGoal);

/**
 * @swagger
 * /api/goals/{id}/progress:
 *   put:
 *     summary: Update the progress of a goal
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Goal ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentValue:
 *                 type: number
 *                 example: 5
 *     responses:
 *       200:
 *         description: Goal progress updated successfully
 *       404:
 *         description: Goal not found
 */
router.put("/:id/progress", protect, updateGoalProgress);

/**
 * @swagger
 * /api/goals/{id}:
 *   delete:
 *     summary: Delete a goal
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Goal ID
 *     responses:
 *       200:
 *         description: Goal successfully deleted
 *       404:
 *         description: Goal not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", protect, deleteGoal);

module.exports = router;