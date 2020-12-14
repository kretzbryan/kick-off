const mongoose = require("mongoose");

const KickoffSchema = new mongoose.Schema({
    start_time: {type: Date, required: true},
    description: {type: String, requirted: true},
    interests: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interests'
    },
})

module.exports = mongoose.Model('Kickoff', KickoffSchema)