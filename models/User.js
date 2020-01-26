const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {type: String, required: true, unique: true},
    age: {type: Number, required: true},
    password: {type: String, required: true}
})

module.exports = model("User", userSchema);