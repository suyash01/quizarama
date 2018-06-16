const express = require("express");
const { body, validationResult } = require("express-validator/check");
const router = express.Router();

const Quiz = require("../models/quiz");

router.get("/", (req, res) => {
    req.flash("info", "welcome");
    req.flash("info", "lol");
    Quiz.find({})
        .exec()
        .then(result => res.status(200).json({ status: 1, data: result }))
        .catch(err => console.log(err));
});

router.post("/", (req, res) => {
    body("title", "Title is required").isEmpty();
    body("start", "Enter a valid start date").isAfter();
    body("end", "Enter a valid end date").isAfter(req.body.start);
    body("duration", "Enter a valid duration").isInt();

    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const quiz = new Quiz({
            title: req.body.title,
            desc: req.body.desc,
            start: req.body.start,
            end: req.body.end,
            duration: req.body.duration
        });
        quiz.save()
            .then(result => {
                res.status(200).json({status: 1, data: result});
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({status: 0, error: "Internal server error"});
            });
    } else {
        console.log(errors);
        res.status(500).json({ status: 0, error: "Internal server error" });
    }
});

module.exports = router;
