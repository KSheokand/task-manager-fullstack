const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  createPersonalTask,
  getPersonalTasks,
  createTeamTask,
  getTeamTasks,
  updateTask,
  deleteTask,
  getPlannedTasks
} = require("../controllers/taskController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management APIs
 */

router.use(protect);

/* =======================
   PERSONAL TASKS
======================= */

/**
 * @swagger
 * /tasks/personal:
 *   post:
 *     summary: Create a personal task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum: [High, Medium, Low]
 *               status:
 *                 type: string
 *                 enum: [Pending, In Progress, Completed]
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Personal task created
 */
router.post("/personal", createPersonalTask);

/**
 * @swagger
 * /tasks/personal:
 *   get:
 *     summary: Get all personal tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of personal tasks
 */
router.get("/personal", getPersonalTasks);

/* =======================
   TEAM TASKS
======================= */

/**
 * @swagger
 * /tasks/team:
 *   post:
 *     summary: Create a team task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, teamId]
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum: [High, Medium, Low]
 *               status:
 *                 type: string
 *                 enum: [Pending, In Progress, Completed]
 *               teamId:
 *                 type: string
 *               assignedTo:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Team task created
 */
router.post("/team", createTeamTask);

/**
 * @swagger
 * /tasks/team:
 *   get:
 *     summary: Get team tasks by teamId
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: teamId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of team tasks
 */
router.get("/team", getTeamTasks);

/* =======================
   PLANNED TASKS
======================= */

/**
 * @swagger
 * /tasks/planned:
 *   get:
 *     summary: Get today's planned tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of planned tasks
 */
router.get("/planned", getPlannedTasks);

/* =======================
   COMMON
======================= */

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Task updated
 */
router.put("/:id", updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Task deleted
 */
router.delete("/:id", deleteTask);

module.exports = router;
