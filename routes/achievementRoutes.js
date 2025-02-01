const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { getAchievements, createAchievement, deleteAchievement } = require("../controllers/achievementController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Achievements
 *   description: Endpoints for managing user achievements
 */

/**
 * @swagger
 * /api/achievements:
 *   get:
 *     summary: Get all achievements of the authenticated user
 *     tags: [Achievements]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of achievements
 */
router.get("/", protect, getAchievements);

/**
 * @swagger
 * /api/achievements:
 *   post:
 *     summary: Create a new achievement
 *     tags: [Achievements]
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
 *                 enum: [streak, weightLoss, firstWorkout, personalRecord]
 *                 example: streak
 *     responses:
 *       201:
 *         description: Achievement successfully created
 *       400:
 *         description: Invalid data
 */
router.post("/", protect, createAchievement);

/**
 * @swagger
 * /api/achievements/{id}:
 *   delete:
 *     summary: Delete an achievement
 *     tags: [Achievements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Achievement ID
 *     responses:
 *       200:
 *         description: Achievement successfully deleted
 *       404:
 *         description: Achievement not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", protect, deleteAchievement);

module.exports = router;