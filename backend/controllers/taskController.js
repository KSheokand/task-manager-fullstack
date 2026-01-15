const Task = require("../models/Task");
const Team = require("../models/Team");

/* =======================
   PERSONAL TASKS
======================= */

// CREATE PERSONAL TASK
exports.createPersonalTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      priority: req.body.priority,
      status: req.body.status,
      dueDate: req.body.dueDate,
      type: "PERSONAL",
      owner: req.user.id,
      createdBy: req.user.id
    });

    res.status(201).json(task);
  } catch (err) {
    console.error("Create personal task error:", err);
    res.status(500).json({ message: "Failed to create personal task" });
  }
};

// GET MY PERSONAL TASKS
exports.getPersonalTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      type: "PERSONAL",
      owner: req.user.id
    }).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    console.error("Get personal tasks error:", err);
    res.status(500).json({ message: "Failed to fetch personal tasks" });
  }
};

/* =======================
   TEAM TASKS
======================= */

// CREATE TEAM TASK
exports.createTeamTask = async (req, res) => {
  try {
    const { teamId, assignedTo } = req.body;

    if (!teamId) {
      return res.status(400).json({ message: "teamId is required" });
    }

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // creator must be a team member
    if (!team.members.map(id => id.toString()).includes(req.user.id)) {
      return res.status(403).json({ message: "Not a team member" });
    }

    // validate assignedTo
    const validAssignees = (assignedTo || []).filter(id =>
      team.members.map(m => m.toString()).includes(id)
    );

    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      priority: req.body.priority,
      status: req.body.status,
      dueDate: req.body.dueDate,
      type: "TEAM",
      teamId,
      assignedTo: validAssignees,
      createdBy: req.user.id
    });

    res.status(201).json(task);
  } catch (err) {
    console.error("Create team task error:", err);
    res.status(500).json({ message: "Failed to create team task" });
  }
};

// GET TEAM TASKS
exports.getTeamTasks = async (req, res) => {
  try {
    const { teamId } = req.query;

    if (!teamId) {
      return res.status(400).json({ message: "teamId query required" });
    }

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    if (!team.members.map(id => id.toString()).includes(req.user.id)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const tasks = await Task.find({
      type: "TEAM",
      teamId
    })
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    console.error("Get team tasks error:", err);
    res.status(500).json({ message: "Failed to fetch team tasks" });
  }
};

/* =======================
   UPDATE TASK
======================= */

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const userId = req.user.id;

    // PERSONAL permissions
    if (
      task.type === "PERSONAL" &&
      task.owner.toString() !== userId
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // TEAM permissions
    if (
      task.type === "TEAM" &&
      task.createdBy.toString() !== userId &&
      !task.assignedTo.map(id => id.toString()).includes(userId)
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // SAFE UPDATABLE FIELDS ONLY
    const allowedFields = [
      "title",
      "description",
      "category",
      "priority",
      "status",
      "dueDate",
      "assignedTo"
    ];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        task[field] = req.body[field];
      }
    });

    await task.save();
    res.json(task);

  } catch (err) {
    console.error("Update task error:", err);
    res.status(500).json({ message: "Failed to update task" });
  }
};

/* =======================
   DELETE TASK
======================= */

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const userId = req.user.id;

    // PERSONAL delete
    if (
      task.type === "PERSONAL" &&
      task.owner.toString() !== userId
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // TEAM delete
    if (
      task.type === "TEAM" &&
      task.createdBy.toString() !== userId
    ) {
      return res.status(403).json({ message: "Only creator can delete" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted" });

  } catch (err) {
    console.error("Delete task error:", err);
    res.status(500).json({ message: "Failed to delete task" });
  }
};

/* =======================
   PLANNED TASKS BY DATE
======================= */
exports.getPlannedTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "date is required" });
    }

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const tasks = await Task.find({
      dueDate: { $gte: start, $lte: end },
      $or: [
        { owner: userId },
        { assignedTo: userId }
      ]
    }).sort({ priority: -1, createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    console.error("Planned tasks error:", err);
    res.status(500).json({ message: "Failed to fetch planned tasks" });
  }
};

