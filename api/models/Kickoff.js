const mongoose = require("mongoose");

const KickoffSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startTime: { type: String, required: true },
  description: { type: String, requirted: true },
  interests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interests",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
  },
});

module.exports = mongoose.model('Kickoff', KickoffSchema)
