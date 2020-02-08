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
            tokens: []
        })
        await user.addToken();
        res.status(200).json({
            message: "Just now user was created!",
            token: user.tokens
        });
    } catch(e) {
        console.log(e);
        res.json(e);
    }
})



router.post('/users/auth', async (req, res) => {
    const cliToken = req.header("Authorization");
    const serToken = jwt.verify(cliToken, config.get("jwtSecret"));

    try {
        const user = await User.findById(serToken._id);
        
        if(user) {
            const {name, age} = user;
            res.status(200).json({
                name,
                age,
                auth: true
            })
        } else if(!user) {
            res.status(200).json({
                auth: false
            })
        } else throw new Error("Invalid jwt");

    } catch(e) {
        console.log(e);
        res.json(e);
    }
})



router.post('/users/login', async (req, res) => {
    const {name, password} = req.body;

    try {
        const user = await User.findOne({name});

        if(!user) {
            res.json("This name don't exists");
            return;
        }

        const checkPass = await bcrypt.compare(password, user.hash);

        if(checkPass) {
            await user.addToken();

            res.status(200).json({
                message: "Success log in",
                token: user.tokens[user.tokens.length - 1],
            });
        } else res.json({message: "Wrong password"})

    } catch(e) {
        console.log(e);
        res.json(e);
    }
})



router.patch('/users/logout', async (req, res) => {
    const cliToken = req.header("Authorization");
    const serToken = jwt.verify(cliToken, config.get("jwtSecret"));

    try {
        const user = await User.findById(serToken._id);
        const tokens = user.tokens.filter(token => token !== cliToken);
        await User.updateOne({_id: user._id}, {tokens : tokens});

        res.status(200).json({message: "Success Log Out"});
    } catch(e) {
        console.log(e);
        res.json(e);
    }
})



// router.post('/users/remove', async (req, res) => {

// })



module.exports = router