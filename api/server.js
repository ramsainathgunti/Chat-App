const express = require("express");
const app = express();
const socket = require("socket.io");
const cors = require("cors");
const port = process.env.PORT || 3500;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

const server = app.listen(port, () => {
    console.log(`Server running on ${port}`);
});

const io = socket(server);

io.of("/").on("connect", (socket) => {
    console.log("client connected");
});