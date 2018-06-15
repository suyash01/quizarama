const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: String,
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    users: [String],
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Quiz', QuizSchema);