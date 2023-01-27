const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "username cannot be empty"],
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, "email cannot be empty"],
        validate: [isEmail, "Invalid email"],
        index: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password cannot be empty"],
    },
    picturePath: String,
    newMessages: {
        type: Object,
        default: {},
    },
    status: {
        type: String,
        default: "online",
    },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);