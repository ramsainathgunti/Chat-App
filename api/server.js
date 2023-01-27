const express = require("express");
const app = express();
const socket = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");

const port = process.env.PORT || 3500;
const conDB = require("./config/conDB");

//DB Connection
conDB();

//middleware
app.use("uploads/", express.static(path.join(__dirname, "/uploads")));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(cors());

//routes
app.use("/api/auth", require("./routes/authRoute"));

mongoose.connection.once("open", () => {
    console.log("DB connected");
});

const server = app.listen(port, () => {
    console.log(`Server running on ${port}`);
});

const io = socket(server);

io.of("/").on("connect", (socket) => {
    console.log("client connected");
});