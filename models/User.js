const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: String,
    age: {type: Number, required: true},
})

module.exports = model("User", userSchema);