const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    ques: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    options: [String],
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Question', QuestionSchema);