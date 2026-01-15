const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    // 👑 Team creator / admin
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // 👥 Team members (owner should always be included)
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  {
    timestamps: true
  }
);

/* 🔥 INDEXES FOR PERFORMANCE */
teamSchema.index({ owner: 1 });
teamSchema.index({ members: 1 });

module.exports = mongoose.model("Team", teamSchema);
