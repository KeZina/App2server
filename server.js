const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');

const app = express();
const urlencodedParses = bodyParser.urlencoded({extended: false});

(async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://KeZzz:b00mka2036@firstcluster-ndmro.mongodb.net/firstApp?retryWrites=true&w=majority', 
            {useNewUrlParser: true, useUnifiedTopology: true}
        )
        app.listen(3003);
        console.log("connection success");
    }
    catch(err) {
        console.log("connection error", err);
        process.exit(500);
    }
})()

// User.create({name: "Artyom"})
//     .then(res => console.log(res))
//     .catch(err => console.log(err))

app.route('/back')
    .get((req, res) => {
        console.log(20);
        res.send({"hi": "there!"});
    })

