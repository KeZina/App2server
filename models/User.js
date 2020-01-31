const {Schema, model} = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    name: {
        type: String, 
        minlength: 3,
        required: true, 
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    hash: {
        type: String,
        minlength: 8,
        required: true
    },
    tokens : [{
        type: String,
        required: true
    }]
})

userSchema.methods.addToken = function() {
    this.tokens.push(jwt.sign({_id: this._id}, config.get("jwtSecret")));
    this.save();
}

module.exports = model("User", userSchema);