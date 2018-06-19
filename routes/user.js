const express = require("express");
const { body, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/user');

router.post("/login", (req, res) => {
    body('username', "Username is required").isEmpty();
    body('password', 'Password must be 6 characters').isLength({min: 6});

    const errors = validationResult(req);
    if(errors.isEmpty()){
        User.findOne({username: req.body.username}).exec()
        .then(user => {
            console.log(user);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({success: 0, error: "Internal server error"});
        })
    }
    else{
        res.status(500).json({success: 0, error: "All fields are required"});
    }
});

router.post("/register", (req, res) => {
    body('name', 'Name is required').isEmpty();
    body('username', "Username is required").isEmpty();
    body('email', 'Enter a valid email').isEmail();
    body('password', 'Password must be 6 characters').isLength({min: 6});

    const errors = validationResult(req);
    if(errors.isEmpty()){

    }
    else{
        res.status(500).json({success: 0, error: "All fields are required"});
    }
})

module.exports = router;
