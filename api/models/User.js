const mongoose = require("mongoose");

<<<<<<< HEAD
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
=======
const UserSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true},
    icon: {type: Number},
    password: { type: String, required: true },
>>>>>>> ca1a4df44e3fd4970dadbce08b6a62713ec1d32f
    interests: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interests",
    },
<<<<<<< HEAD
    upcomingKickoffs: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kickoffs",
=======
    createdKickoffs: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Kickoffs'
>>>>>>> ca1a4df44e3fd4970dadbce08b6a62713ec1d32f
    },
    pastKickoffs: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kickoffs",
    },
    friends: {
<<<<<<< HEAD
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.Model("User", UserSchema);
=======
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

module.exports = mongoose.model('Model', UserSchema)
>>>>>>> ca1a4df44e3fd4970dadbce08b6a62713ec1d32f
