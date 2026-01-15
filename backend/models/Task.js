const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: String,
    category: String,

    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium"
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending"
    },

    dueDate: Date,

    // 🔑 TASK TYPE
    type: {
      type: String,
      enum: ["PERSONAL", "TEAM"],
      required: true
    },

    // 👤 PERSONAL TASK OWNER
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    // 👥 TEAM TASK FIELDS
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team"
    },

    assignedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    // 🧠 WHO CREATED THE TASK (IMPORTANT FOR TEAMS)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
      // ❌ not required at schema level
      // ✅ enforce in controller for TEAM tasks
    }
  },
  {
    timestamps: true // ✅ REQUIRED for analytics & charts
  }
);

/* 🔥 INDEXES FOR PERFORMANCE (IMPORTANT) */
taskSchema.index({ type: 1 });
taskSchema.index({ owner: 1 });
taskSchema.index({ assignedTo: 1 });
taskSchema.index({ updatedAt: 1 });

module.exports = mongoose.model("Task", taskSchema);
