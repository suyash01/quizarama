const express = require("express");
const { body, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/user');

router.post("/login", (req, res) => {
    body('uname', "Username is required").isEmpty();
    body('pass', 'Password must be 6 characters').isLength({min: 6});

    const errors = validationResult(req);
    if(errors.isEmpty()){
        User.findOne({username: req.body.username}, (err, user) => {
            if(err)
                return res.status(500).json({status: 0, error: "Internal server error"});
            if(user){
                bcrypt.compare(req.body.pass, user.password, (err, response) => {
                    if(err)
                        return res.status(500).json({status: 0, error: "Internal server error"});
                    if(response===false)
                        return res.status(400).json({status: 0, error: "Invalid username/password"});
                    jwt.sign({user: user}, process.env.SECRET, {expiresIn: "6h"}, (err, token) => {
                        if(err){
                            console.log(err);
                            return res.status(500).json({status: 0, error: "Internal server error"});
                        }
                        return res.status(200).json({status: 1, data: token});
                    });
                });
            }
            return res.status(400).json({status: 0, error: "Invalid username/password"}); 
        })
    }
    else{
        return res.status(400).json({status: 0, error: "All fields are required"});
    }
});

router.post("/register", (req, res) => {
    body('name', 'Name is required').isEmpty();
    body('uname', "Username is required").isEmpty();
    body('email', 'Enter a valid email').isEmail();
    body('pass', 'Password must be 6 characters').isLength({min: 6});

    const errors = validationResult(req);
    if(errors.isEmpty()){
        User.findOne({username: req.body.uname}, (err, user) => {
            if(user){
                return res.status(400).json({status: 0, error: "Username already taken"});
            }
            else if(err){
                console.log(err);
                return res.status(500).json({status: 0, error: "Internal server error"});
            }
            User.findOne({email: req.body.email}, (err, user) => {
                if(user){
                    return res.status(400).json({status: 0, error: "Email already in use"});
                }
                else if(err){
                    console.log(err);
                    return res.status(500).json({status: 0, error: "Internal server error"});
                }
                bcrypt.hash(req.body.pass, 10, function(err, hash) {
                    if(err){
                        console.log(err);
                        return res.status(500).json({status: 0, error: "Internal server Error"});
                    }
                    const user = new User({
                        name: req.body.name,
                        username: req.body.uname,
                        email: req.body.email,
                        password: hash
                    });
                    user.save((err) => {
                        if(err){
                            console.log(err);
                            return res.status(500).json({status: 0, error: "Internal server error"});
                        }
                        return res.status(200).json({status: 1, data: "Successfully registered :)"});
                    });
                });
            });
        });
    }
    else{
        return res.status(400).json({status: 0, error: "All fields are required"});
    }
})

module.exports = router;
