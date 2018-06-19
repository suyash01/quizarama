const mongoose = require("mongoose");

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
    score: {
        type: Number,
        default: 1
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Question", QuestionSchema);
