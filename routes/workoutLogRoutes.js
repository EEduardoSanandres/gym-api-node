const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { getWorkoutLogs, createWorkoutLog, updateWorkoutLog, deleteWorkoutLog } = require("../controllers/workoutLogController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Workout Logs
 *   description: Endpoints for managing workout logs
 */

/**
 * @swagger
 * /api/workout-logs:
 *   get:
 *     summary: Get all workout logs of the authenticated user
 *     tags: [Workout Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of workout logs
 */
router.get("/", protect, getWorkoutLogs);

/**
 * @swagger
 * /api/workout-logs:
 *   post:
 *     summary: Create a new workout log
 *     tags: [Workout Logs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               exercises:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     exercise:
 *                       type: string
 *                       example: 60c72b2f9b1d8b001c8e4c1e
 *                     setsCompleted:
 *                       type: integer
 *                       example: 4
 *                     repsPerSet:
 *                       type: array
 *                       items:
 *                         type: integer
 *                         example: 10
 *                     weightsUsed:
 *                       type: array
 *                       items:
 *                         type: number
 *                         example: 50
 *                     notes:
 *                       type: string
 *                       example: Focused on form
 *               duration:
 *                 type: integer
 *                 example: 60
 *     responses:
 *       201:
 *         description: Workout log successfully created
 *       400:
 *         description: Invalid data
 */
router.post("/", protect, createWorkoutLog);

/**
 * @swagger
 * /api/workout-logs/{id}:
 *   put:
 *     summary: Update a workout log
 *     tags: [Workout Logs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Workout log ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               exercises:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     exercise:
 *                       type: string
 *                       example: 60c72b2f9b1d8b001c8e4c1e
 *                     setsCompleted:
 *                       type: integer
 *                       example: 5
 *                     repsPerSet:
 *                       type: array
 *                       items:
 *                         type: integer
 *                         example: 12
 *                     weightsUsed:
 *                       type: array
 *                       items:
 *                         type: number
 *                         example: 55
 *                     notes:
 *                       type: string
 *                       example: Increased weight
 *               duration:
 *                 type: integer
 *                 example: 75
 *     responses:
 *       200:
 *         description: Workout log updated successfully
 *       404:
 *         description: Workout log not found
 */
router.put("/:id", protect, updateWorkoutLog);

/**
 * @swagger
 * /api/workout-logs/{id}:
 *   delete:
 *     summary: Delete a workout log
 *     tags: [Workout Logs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Workout log ID
 *     responses:
 *       200:
 *         description: Workout log deleted successfully
 *       404:
 *         description: Workout log not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", protect, deleteWorkoutLog);

module.exports = router;