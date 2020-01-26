const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');



router.post('/users/auth/create', async (req, res) => {
    const name = req.body.name;
    try {
        const user = await User.findOne({name});
        if(user) {
            res.json("This name already exists");
            return;
        }

        const password = await bcrypt.hash(req.body.password, 10);
        await User.create({
            name,
            age: req.body.age,
            password
        })
        res.json("Just now user was created!")
    } catch(e) {
        console.log(e);
    }
})



router.post('/users/auth/login', async (req, res) => {
    const name = req.body.name;
    try {
        const user = await User.findOne({name});
        if(!user) {
            res.json("This name don't exists");
            return;
        }

        const checkPass = await bcrypt.compare(req.body.password, user.password);
        if(checkPass) {
            res.json("Success!");
        } else res.json("Wrong password")
    } catch(e) {
        console.log(e);
    }
})



module.exports = router