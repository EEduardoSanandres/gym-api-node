const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { getExercises, createExercise, getExerciseById, deleteExercise } = require("../controllers/exerciseController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Exercises
 *   description: Endpoints for managing exercises
 */

/**
 * @swagger
 * /api/exercises:
 *   get:
 *     summary: Get all exercises
 *     tags: [Exercises]
 *     responses:
 *       200:
 *         description: List of exercises
 */
router.get("/", getExercises);

/**
 * @swagger
 * /api/exercises:
 *   post:
 *     summary: Create a new exercise
 *     tags: [Exercises]
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
 *                 example: Bench Press
 *               description:
 *                 type: string
 *                 example: Strength exercise for chest
 *               muscleGroup:
 *                 type: string
 *                 example: Chest
 *               equipment:
 *                 type: string
 *                 example: Barbell and weights
 *     responses:
 *       201:
 *         description: Exercise successfully created
 */
router.post("/", protect, createExercise);

/**
 * @swagger
 * /api/exercises/{id}:
 *   get:
 *     summary: Get an exercise by ID
 *     tags: [Exercises]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Exercise ID
 *     responses:
 *       200:
 *         description: Exercise details
 *       404:
 *         description: Exercise not found
 */
router.get("/:id", getExerciseById);

/**
 * @swagger
 * /api/exercises/{id}:
 *   delete:
 *     summary: Delete an exercise
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Exercise ID
 *     responses:
 *       200:
 *         description: Exercise successfully deleted
 *       404:
 *         description: Exercise not found
 */
router.delete("/:id", protect, deleteExercise);

module.exports = router;
