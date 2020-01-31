const express = require('express');
const config = require('config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');


router.post('/users/create', async (req, res) => {
    const {name, age, password} = req.body;
    try {
        const isUser = await User.findOne({name});
        if(isUser) {
            res.json(`This name already exists`);
            return;
        }
        const hash = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            age,
            hash,
            tokens: jwt.sign({_id: this._id}, config.get("jwtSecret"))
        })
        await user.save();
        res.status(200).json({
            message: "Just now user was created!",
            tokens: user.tokens
        });
    } catch(e) {
        console.log(e);
    }
})



router.post('/users/login', async (req, res) => {
    const {name, password} = req.body;
    try {
        const user = await User.findOne({name});
        if(!user) {
            res.json(`This name don't exists`);
            return;
        }

        const checkPass = await bcrypt.compare(password, user.hash);
        if(checkPass) {
            user.addToken();
            res.status(200).json({
                message: "Success log in",
                tokens: user.tokens
            });
        } else res.json(`Wrong password`)
    } catch(e) {
        console.log(e);
    }
})



// router.post('/users/remove', async (req, res) => {

// })



module.exports = router