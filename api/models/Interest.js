const mongoose = require("mongoose");

const InterestSchema = new mongoose.Schema({
  tag: { type: String, unique: true, required: true },
});

module.exports = mongoose.model("Interests", InterestSchema);