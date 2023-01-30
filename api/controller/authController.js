const User = require("../models/User");
const bcrypt = require("bcrypt");

const registerController = async(req, res) => {
    const { username, email, password, pictureName } = req.body;
    console.log(pictureName);
    try {
        const foundUser = await User.findOne({ email });
        if (foundUser) return res.status(400).json(`User already exists`);

        const hashPwd = await bcrypt.hash(password, 10);

        let user = await User.create({
            username,
            email,
            password: hashPwd,
            picturePath: pictureName,
        });
        user = user.toObject();
        delete user.password;

        res.status(201).json({ user });
    } catch (err) {
        console.log(err);
    }
};

const loginController = async(req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    try {
        const foundUser = await User.findOne({ email });
        if (!foundUser) return res.status(400).json("User not found");
        const passMatch = await bcrypt.compare(password, foundUser.password);

        if (!passMatch) return res.status(401).json("Invalid credentials");
        let user = foundUser.toObject();
        delete user.password;

        res.status(200).json(user);
    } catch (err) {
        console.log(err);
    }
};

module.exports = { registerController, loginController };