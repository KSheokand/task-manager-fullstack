const express = require("express");
const protect = require("../middleware/authMiddleware");
const { getDashboardData } = require("../controllers/dashboardController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard analytics APIs
 */

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Get dashboard analytics data
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data returned successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", protect, getDashboardData);

module.exports = router;
