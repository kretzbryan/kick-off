const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  photo: {type: String},
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  interests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interests",
    },
  ],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  upcomingKickoffs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kickoff",
    },
  ],
});

module.exports = mongoose.model("Group", GroupSchema);
