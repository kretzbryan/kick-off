const mongoose = require("mongoose");

const KickoffSchema = new mongoose.Schema({
    title: {type: String, required: true},
    start_time: {type: Date, required: true},
    description: {type: String, requirted: true},
    interests: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interests'
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})

module.exports = mongoose.Model('Kickoff', KickoffSchema)