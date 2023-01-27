const mongoose = require("mongoose");
require("dotenv").config();

const conDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports = conDB;