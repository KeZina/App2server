const express = require('express');
const config = require('config');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const auth = require('./routes/auth')

const app = express();
const upload = multer();

const dbUrl = config.get("dbUrl");
const port = config.get("port");

(async () => {
    try {
        await mongoose.connect(
            dbUrl,
            {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}
        )
        app.listen(port);
        console.log("connection success");
    }
    catch(err) {
        console.log("connection error", err);
        process.exit(500);
    }
})()

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(upload.none());
app.use(auth)

app.use((req, res) => {
    res.status(404).json("Not Found :(")
})