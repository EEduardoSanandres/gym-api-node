const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { createWorkoutPlan, getWorkoutPlans, updateWorkoutPlan } = require("../controllers/workoutPlanController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Workout Plans
 *   description: Endpoints for managing workout plans
 */

/**
 * @swagger
 * /api/workout-plans:
 *   get:
 *     summary: Get all workout plans of the authenticated user
 *     tags: [Workout Plans]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of workout plans
 */
router.get("/", protect, getWorkoutPlans);

/**
 * @swagger
 * /api/workout-plans:
 *   post:
 *     summary: Create a new workout plan
 *     tags: [Workout Plans]
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
 *                 example: Strength Routine
 *               weeks:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     days:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           exercises:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 exercise:
 *                                   type: string
 *                                   example: 60c72b2f9b1d8b001c8e4c1e
 *                                 sets:
 *                                   type: integer
 *                                   example: 4
 *                                 reps:
 *                                   type: integer
 *                                   example: 10
 *                                 weight:
 *                                   type: number
 *                                   example: 20
 *                                 unit:
 *                                   type: string
 *                                   enum: [kg, lbs]
 *                                   example: kg
 *     responses:
 *       201:
 *         description: Workout plan successfully created
 *       400:
 *         description: Invalid data
 */
router.post("/", protect, createWorkoutPlan);

/**
 * @swagger
 * /api/workout-plans/{id}:
 *   put:
 *     summary: Update a workout plan
 *     tags: [Workout Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Workout plan ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Volume Routine
 *               weeks:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     days:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           exercises:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 exercise:
 *                                   type: string
 *                                   example: 60c72b2f9b1d8b001c8e4c1e
 *                                 sets:
 *                                   type: integer
 *                                   example: 3
 *                                 reps:
 *                                   type: integer
 *                                   example: 12
 *                                 weight:
 *                                   type: number
 *                                   example: 25
 *                                 unit:
 *                                   type: string
 *                                   enum: [kg, lbs]
 *                                   example: lbs
 *     responses:
 *       200:
 *         description: Workout plan successfully updated
 *       404:
 *         description: Plan not found
 */
router.put("/:id", protect, updateWorkoutPlan);

module.exports = router;
