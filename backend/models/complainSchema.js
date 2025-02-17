const mongoose = require('mongoose');

const complainSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now // Automatically sets the current date if not provided
    },
    complaint: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("complain", complainSchema);
