const express = require('express');
const { body, validationResult } = require('express-validator/check');
const router = express.Router();

const Quiz = require('../models/quiz');

router.get('/', (req, res) => {
    req.flash('info', 'welcome');
    req.flash('info', 'lol');
    Quiz.find({}).exec()
        .then(result => res.render('quiz', {data: result}))
        .catch(err => console.log(err));
});

router.post('/', (req, res) => {
    body('title', 'Title is required').isEmpty();
    body('start', 'Enter a valid start date').isAfter();
    body('end', 'Enter a valid end date').isAfter(req.body.start);
    body('duration', 'Enter a valid duration').isEmpty().isInt();

    const errors = validationResult(req);
    if(errors.isEmpty()){
        const quiz = new Quiz({
            title: req.body.title,
            desc: req.body.desc,
            start: req.body.start,
            end: req.body.end,
            duration: req.body.duration
        });
        // quiz.save()
        //     .then(result => {
        //         req.flash('success', 'Quiz added successfully');
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         req.flash('danger', 'Internal server error');
        //     });
        console.log('saved');
        req.flash('info', 'I am working');
        res.redirect('/quiz');
    }
    else{
        console.log(errors);
        req.flash('danger', 'Internal server error');
        res.redirect('/quiz');
    }
});

module.exports = router;