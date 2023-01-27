const {
    registerController,
    loginController,
} = require("../controller/authController");
const router = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

router
    .post("/register", upload.single("picture"), registerController)
    .post("/login", loginController);

module.exports = router;