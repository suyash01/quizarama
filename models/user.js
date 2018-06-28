const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    access: {
        type: Number,
        default: 3
    },
    quizes: [
        {
            quiz: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Quiz"
            },
            score: {
                type: Number,
                default: 0
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("User", UserSchema);
