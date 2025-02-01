const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { getMeals, createMeal, updateMeal, deleteMeal } = require("../controllers/mealController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Meals
 *   description: Endpoints for managing user meals
 */

/**
 * @swagger
 * /api/meals:
 *   get:
 *     summary: Get all meals of the authenticated user
 *     tags: [Meals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of meals
 */
router.get("/", protect, getMeals);

/**
 * @swagger
 * /api/meals:
 *   post:
 *     summary: Create a new meal entry
 *     tags: [Meals]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               meals:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Chicken Salad
 *                     calories:
 *                       type: number
 *                       example: 300
 *                     protein:
 *                       type: number
 *                       example: 25
 *                     carbs:
 *                       type: number
 *                       example: 10
 *                     fats:
 *                       type: number
 *                       example: 15
 *     responses:
 *       201:
 *         description: Meal entry successfully created
 *       400:
 *         description: Invalid data
 */
router.post("/", protect, createMeal);

/**
 * @swagger
 * /api/meals/{id}:
 *   put:
 *     summary: Update a meal entry
 *     tags: [Meals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Meal ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               meals:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Grilled Salmon
 *                     calories:
 *                       type: number
 *                       example: 400
 *                     protein:
 *                       type: number
 *                       example: 30
 *                     carbs:
 *                       type: number
 *                       example: 5
 *                     fats:
 *                       type: number
 *                       example: 20
 *     responses:
 *       200:
 *         description: Meal entry updated successfully
 *       404:
 *         description: Meal not found
 */
router.put("/:id", protect, updateMeal);

/**
 * @swagger
 * /api/meals/{id}:
 *   delete:
 *     summary: Delete a meal entry
 *     tags: [Meals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Meal ID
 *     responses:
 *       200:
 *         description: Meal entry deleted successfully
 *       404:
 *         description: Meal not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", protect, deleteMeal);

module.exports = router;