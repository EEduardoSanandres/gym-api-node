const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { getExercises, createExercise, getExerciseById, deleteExercise } = require("../controllers/exerciseController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Exercises
 *     description: Endpoints for managing exercises, including retrieval, creation, and deletion.
 */

/**
 * @swagger
 * /api/exercises:
 *   get:
 *     summary: Get all exercises
 *     description: Retrieve a list of all available exercises, including their details such as muscle group, equipment, and difficulty level.
 *     tags: [Exercises]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of exercises.
 */
router.get("/", getExercises);

/**
 * @swagger
 * /api/exercises:
 *   post:
 *     summary: Create a new exercise
 *     description: Add a new exercise to the database with all required details, including steps, difficulty level, and optional media links.
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
 *                 description: Name of the exercise.
 *                 example: Bench Press
 *               muscleGroup:
 *                 type: string
 *                 description: Primary muscle group targeted by the exercise.
 *                 example: Chest
 *               equipment:
 *                 type: string
 *                 description: Equipment required to perform the exercise.
 *                 example: Barbell and weights
 *               steps:
 *                 type: array
 *                 description: Step-by-step instructions to correctly perform the exercise.
 *                 items:
 *                   type: string
 *                 example:
 *                   - "Lie down on a flat bench and grip the bar slightly wider than shoulder-width."
 *                   - "Slowly lower the bar until it touches your chest."
 *                   - "Push the bar back up until your arms are fully extended."
 *               difficulty:
 *                 type: string
 *                 description: The difficulty level of the exercise.
 *                 enum: ["Beginner", "Intermediate", "Advanced"]
 *                 example: Intermediate
 *               videoUrl:
 *                 type: string
 *                 description: (Optional) URL of a video demonstration of the exercise.
 *                 nullable: true
 *                 example: "https://www.youtube.com/watch?v=some-video-id"
 *               imageUrl:
 *                 type: string
 *                 description: (Optional) URL of an image illustrating the exercise.
 *                 nullable: true
 *                 example: "https://example.com/bench-press-image.jpg"
 *               gifUrl:
 *                 type: string
 *                 description: (Optional) URL of a GIF showing the exercise movement.
 *                 nullable: true
 *                 example: "https://example.com/bench-press.gif"
 *     responses:
 *       201:
 *         description: Successfully created the new exercise.
 *       400:
 *         description: Invalid input, missing required fields, or incorrect data format.
 */
router.post("/", protect, createExercise);

/**
 * @swagger
 * /api/exercises/{id}:
 *   get:
 *     summary: Get an exercise by ID
 *     description: Retrieve details of a specific exercise using its unique ID.
 *     tags: [Exercises]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the exercise.
 *     responses:
 *       200:
 *         description: Successfully retrieved the exercise details.
 *       404:
 *         description: Exercise not found.
 */
router.get("/:id", getExerciseById);

/**
 * @swagger
 * /api/exercises/{id}:
 *   delete:
 *     summary: Delete an exercise
 *     description: Remove an existing exercise from the database using its ID.
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the exercise to be deleted.
 *     responses:
 *       200:
 *         description: Successfully deleted the exercise.
 *       404:
 *         description: Exercise not found.
 */
router.delete("/:id", protect, deleteExercise);

module.exports = router;
