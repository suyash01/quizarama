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
    options: [String]
});

module.exports = mongoose.model('Question', QuestionSchema);