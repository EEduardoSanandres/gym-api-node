const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { getRoutines, createRoutine, updateRoutine, deleteRoutine } = require("../controllers/routineController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Routines
 *   description: Endpoints for managing workout routines
 */

/**
 * @swagger
 * /api/routines:
 *   get:
 *     summary: Get all routines
 *     tags: [Routines]
 *     responses:
 *       200:
 *         description: List of routines
 */
router.get("/", getRoutines);

/**
 * @swagger
 * /api/routines:
 *   post:
 *     summary: Create a new routine
 *     tags: [Routines]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Full Body Strength
 *               difficulty:
 *                 type: string
 *                 enum: [Beginner, Intermediate, Advanced]
 *                 example: Intermediate
 *               durationWeeks:
 *                 type: integer
 *                 example: 8
 *               focus:
 *                 type: string
 *                 enum: [strength, hiit, mobility]
 *                 example: strength
 *               exercises:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     exercise:
 *                       type: string
 *                       example: 60c72b2f9b1d8b001c8e4c1e
 *                     sets:
 *                       type: integer
 *                       example: 4
 *                     reps:
 *                       type: integer
 *                       example: 10
 *     responses:
 *       201:
 *         description: Routine successfully created
 *       400:
 *         description: Invalid data
 */
router.post("/", protect, createRoutine);

/**
 * @swagger
 * /api/routines/{id}:
 *   put:
 *     summary: Update a routine
 *     tags: [Routines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Routine ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Upper Body Strength
 *               difficulty:
 *                 type: string
 *                 enum: [Beginner, Intermediate, Advanced]
 *                 example: Advanced
 *               durationWeeks:
 *                 type: integer
 *                 example: 12
 *               focus:
 *                 type: string
 *                 enum: [strength, hiit, mobility]
 *                 example: hiit
 *               exercises:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     exercise:
 *                       type: string
 *                       example: 60c72b2f9b1d8b001c8e4c1e
 *                     sets:
 *                       type: integer
 *                       example: 5
 *                     reps:
 *                       type: integer
 *                       example: 12
 *     responses:
 *       200:
 *         description: Routine updated successfully
 *       404:
 *         description: Routine not found
 */
router.put("/:id", protect, updateRoutine);

/**
 * @swagger
 * /api/routines/{id}:
 *   delete:
 *     summary: Delete a routine
 *     tags: [Routines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Routine ID
 *     responses:
 *       200:
 *         description: Routine deleted successfully
 *       404:
 *         description: Routine not found
 */
router.delete("/:id", protect, deleteRoutine);

module.exports = router;