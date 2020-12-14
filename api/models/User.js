const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    interests: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interests",
    },
    upcomingKickoffs: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kickoffs",
    },
    pastKickoffs: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kickoffs",
    },
    friends: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

<<<<<<< HEAD
module.exports = mongoose.Model("Model", ModelSchema);
=======
module.exports = mongoose.Model('User', UserSchema)
>>>>>>> acae2934391478cc8f1873aac8116e2fefbb37c2
