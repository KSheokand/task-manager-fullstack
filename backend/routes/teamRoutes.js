const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  createTeam,
  getMyTeams,
  inviteMember,
  getTeamById
} = require("../controllers/teamController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: Team management APIs
 */

router.use(protect);

/* =======================
   TEAM MANAGEMENT
======================= */

/**
 * @swagger
 * /teams:
 *   post:
 *     summary: Create a new team
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Development Team
 *     responses:
 *       201:
 *         description: Team created successfully
 */
router.post("/", createTeam);

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Get teams of logged-in user
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of teams
 */
router.get("/", getMyTeams);

/**
 * @swagger
 * /teams/{id}:
 *   get:
 *     summary: Get team details by ID
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Team details
 *       404:
 *         description: Team not found
 */
router.get("/:id", getTeamById);

/**
 * @swagger
 * /teams/{id}/invite:
 *   post:
 *     summary: Invite a user to a team by email
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: User invited successfully
 *       403:
 *         description: Only team owner can invite
 */
router.post("/:id/invite", inviteMember);

module.exports = router;
