const Team = require("../models/Team");
const User = require("../models/User");

/* =======================
   CREATE TEAM
======================= */
exports.createTeam = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Team name is required" });
    }

    const team = await Team.create({
      name,
      owner: req.user.id,
      members: [req.user.id] // 👑 owner is always a member
    });

    res.status(201).json(team);
  } catch (err) {
    console.error("Create team error:", err);
    res.status(500).json({ message: "Failed to create team" });
  }
};

/* =======================
   GET MY TEAMS
======================= */
exports.getMyTeams = async (req, res) => {
  try {
    const teams = await Team.find({
      members: req.user.id
    })
      .populate("owner", "name email")
      .populate("members", "name email"); // ✅ REQUIRED

    res.json(teams);
  } catch (err) {
    console.error("Get teams error:", err);
    res.status(500).json({ message: "Failed to fetch teams" });
  }
};

/* =======================
   INVITE MEMBER (EMAIL)
======================= */
exports.inviteMember = async (req, res) => {
  try {
    const { email } = req.body;
    const teamId = req.params.id;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    if (team.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only owner can invite members" });
    }

    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const memberIds = team.members.map(id => id.toString());

    if (memberIds.includes(user._id.toString())) {
      return res.status(400).json({ message: "User already in team" });
    }

    team.members.push(user._id);
    await team.save();

    res.json({ message: "User added to team" });
  } catch (err) {
    console.error("Invite member error:", err);
    res.status(500).json({ message: "Failed to invite member" });
  }
};

/* =======================
   GET TEAM BY ID
======================= */
exports.getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate("members", "name email")
      .populate("owner", "name email");

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    const isMember = team.members
      .map(m => m._id.toString())
      .includes(req.user.id);

    if (!isMember) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(team);
  } catch (err) {
    console.error("Get team error:", err);
    res.status(500).json({ message: "Failed to fetch team" });
  }
};
