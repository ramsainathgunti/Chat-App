const express = require("express");
const app = express();
const socket = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const rooms = ["general", "tech", "finance", "crypto"];
const port = process.env.PORT || 3500;
const conDB = require("./config/conDB");

const Message = require("./models/Message");
const User = require("./models/User");

//DB Connection
conDB();

//middleware
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//routes
app.use("/api/auth", require("./routes/authRoute"));

app.get("/rooms", (req, res) => {
    res.json(rooms);
});

mongoose.connection.once("open", () => {
    console.log("DB connected");
});

const server = app.listen(port, () => {
    console.log(`Server running on ${port}`);
});

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

const getLastMessagesFromRooms = async(room) => {
    let roomMessages = await Message.aggregate([
        { $match: { to: room } },
        { $group: { _id: "$date", messagesByDate: { $push: "$$ROOT" } } },
    ]);
    return roomMessages;
};

const sortRoomMessagesByDate = (messages) => {
    return messages.sort((a, b) => {
        let date1 = a._id.split("/");
        let date2 = b._id.split("/");
        date1 = date1[2] + date1[0] + date1[1];
        date2 = date2[2] + date2[0] + date2[1];
        return date1 < date2 ? -1 : 1;
    });
};

io.of("/").on("connect", (socket) => {
    //console.log("client connected");

    socket.on("new-user", async() => {
        let members = await User.find();
        //io.emit emits to all users and socket.emit emits to that specific user
        members = members.map((member) => {
            let user = member.toObject();
            delete user.password;
            return user;
        });
        socket.emit("new-user", members);
    });

    socket.on("join-room", async(newRoom, previousRoom) => {
        socket.join(newRoom);

        //to leave the previously connected room
        socket.leave(previousRoom);
        let roomMessages = await getLastMessagesFromRooms(newRoom);
        roomMessages = sortRoomMessagesByDate(roomMessages);
        socket.emit("room-messages", roomMessages);
    });

    socket.on("message-room", async(content, room, sender, date, time) => {
        console.log("new message", content);
        const newMessage = await Message.create({
            content,
            from: sender,

            date,
            time,
            to: room,
        });
        let roomMessages = await getLastMessagesFromRooms(room);
        roomMessages = sortRoomMessagesByDate(roomMessages);
        //emitting messages to room
        console.log("roomMessages", roomMessages);
        io.to(room).emit("room-messages", roomMessages);
        socket.broadcast.emit("notifications", room);
    });

    app.delete("/api/logout", async(req, res) => {
        try {
            const { _id, newMessages } = req.body;
            const user = await User.findById(_id);
            user.status = "offline";
            user.newMessages = newMessages;
            await user.save();
            const members = await User.find();
            socket.broadcast.emit("new-user", members);
            res.status(200).send();
        } catch (err) {
            console.log(err);
            res.status(400).send();
        }
    });
});