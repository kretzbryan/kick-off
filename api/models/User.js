const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    icon: { type: Number },
    password: { type: String, required: true },
    interests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Interests",
      },
    ],
    createdKickoffs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Kickoffs",
      },
    ],
    pastKickoffs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Kickoffs",
      },
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
