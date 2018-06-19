const mongoose = require("mongoose");

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
    negative: {
        type: Number,
        default: 0
    },
    users: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            started: {
                type: Boolean,
                default: false
            },
            start: Date
        }
    ],
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Quiz", QuizSchema);
