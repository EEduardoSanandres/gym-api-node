const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { 
  getExercises, 
  createExercise, 
  getExerciseById, 
  deleteExercise,
  updateExercise,
  getExercisesByMuscleGroup,
  getExercisesByDifficulty
} = require("../controllers/exerciseController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Exercises
 *     description: Endpoints for managing exercises, including retrieval, creation, updating, and deletion.
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
 *                 example: Bench Press
 *               muscleGroup:
 *                 type: string
 *                 example: Chest
 *               equipment:
 *                 type: string
 *                 example: Barbell and weights
 *               steps:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - "Lie down on a flat bench and grip the bar slightly wider than shoulder-width."
 *                   - "Slowly lower the bar until it touches your chest."
 *                   - "Push the bar back up until your arms are fully extended."
 *               difficulty:
 *                 type: string
 *                 enum: ["Beginner", "Intermediate", "Advanced"]
 *                 example: Intermediate
 *               videoUrl:
 *                 type: string
 *                 nullable: true
 *                 example: "https://www.youtube.com/watch?v=some-video-id"
 *               imageUrl:
 *                 type: string
 *                 nullable: true
 *                 example: "https://example.com/bench-press-image.jpg"
 *               gifUrl:
 *                 type: string
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
 *   put:
 *     summary: Update an exercise
 *     description: Modify an existing exercise by its ID.
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               muscleGroup:
 *                 type: string
 *               equipment:
 *                 type: string
 *               steps:
 *                 type: array
 *                 items:
 *                   type: string
 *               difficulty:
 *                 type: string
 *                 enum: ["Beginner", "Intermediate", "Advanced"]
 *               videoUrl:
 *                 type: string
 *                 nullable: true
 *               imageUrl:
 *                 type: string
 *                 nullable: true
 *               gifUrl:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Successfully updated the exercise.
 *       404:
 *         description: Exercise not found.
 */
router.put("/:id", protect, updateExercise);

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
 *         description: Successfully deleted the exercise.
 *       404:
 *         description: Exercise not found.
 */
router.delete("/:id", protect, deleteExercise);

/**
 * @swagger
 * /api/exercises/muscle-group/{muscleGroup}:
 *   get:
 *     summary: Get exercises by muscle group
 *     tags: [Exercises]
 *     parameters:
 *       - in: path
 *         name: muscleGroup
 *         required: true
 *         schema:
 *           type: string
 *         description: Muscle group name
 *     responses:
 *       200:
 *         description: List of exercises for the given muscle group.
 */
router.get("/muscle-group/:muscleGroup", getExercisesByMuscleGroup);

/**
 * @swagger
 * /api/exercises/difficulty/{difficulty}:
 *   get:
 *     summary: Get exercises by difficulty level
 *     tags: [Exercises]
 *     parameters:
 *       - in: path
 *         name: difficulty
 *         required: true
 *         schema:
 *           type: string
 *           enum: ["Beginner", "Intermediate", "Advanced"]
 *         description: Difficulty level
 *     responses:
 *       200:
 *         description: List of exercises matching the difficulty level.
 */
router.get("/difficulty/:difficulty", getExercisesByDifficulty);

module.exports = router;
