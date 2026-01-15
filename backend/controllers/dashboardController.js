const Task = require("../models/Task");
const Team = require("../models/Team");

/* =======================
   HELPERS
======================= */
const buildChart = tasks => {
  const map = {};

  tasks.forEach(t => {
    if (!t.updatedAt) return;
    const day = t.updatedAt.toISOString().slice(0, 10);
    map[day] = (map[day] || 0) + 1;
  });

  return map;
};

/* =======================
   DASHBOARD DATA
======================= */
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    /* -------- PERSONAL TASKS -------- */
    const personalTasks = await Task.find({
      type: "PERSONAL",
      owner: userId
    });

    const personalCompleted = personalTasks.filter(
      t => t.status === "Completed"
    );
    const personalPending = personalTasks.filter(
      t => t.status !== "Completed"
    );

    /* -------- USER TEAMS -------- */
    const teams = await Team.find({ members: userId });

    const teamIds = teams.map(t => t._id);

    /* -------- TEAM TASKS -------- */
    const teamTasks = await Task.find({
      type: "TEAM",
      teamId: { $in: teamIds },
      $or: [{ assignedTo: userId }, { createdBy: userId }]
    });

    const teamCompleted = teamTasks.filter(
      t => t.status === "Completed"
    );
    const teamPending = teamTasks.filter(
      t => t.status !== "Completed"
    );

    /* -------- LAST 10 DAYS -------- */
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 9);

    const personalChart = buildChart(
      personalCompleted.filter(t => t.updatedAt >= fromDate)
    );

    const teamChart = buildChart(
      teamCompleted.filter(t => t.updatedAt >= fromDate)
    );

    /* -------- RESPONSE -------- */
    res.json({
      personal: {
        total: personalTasks.length,
        completed: personalCompleted.length,
        pending: personalPending.length,
        chart: personalChart
      },
      team: {
        total: teamTasks.length,
        completed: teamCompleted.length,
        pending: teamPending.length,
        chart: teamChart
      },
      teams
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: "Dashboard error" });
  }
};
