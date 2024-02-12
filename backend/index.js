import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";
import { sequelize } from "./models/index";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

const PORT = process.env.PORT || 5000;

app.use("/api/v1", routes);

app.get("/api/v1/", (req, res) => {
  res.json({
    message: "Welcome to the chat app",
  });
});

const rooms = []; // [{ name: "room1", users: [{username: "ali", id: 1}], messages: [{text: "Ali Here", userId: 1}] }]

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database");
    sequelize.sync().then(() => {
      const server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
      const io = require("socket.io")(server, {
        pingTimeout: 60000,
        cors: {
          origin: "http://localhost:5173",
        },
      });
      io.on("connection", (socket) => {
        const addMessage = (data) => {
          console.log("Message Received");
          let room = rooms.find((room) => room.name === data.room);
          room.messages = [...room.messages, data.message].slice(-10);
          io.to(data.room).emit("message-room", {
            room: data.room,
            message: data.message,
          });
        };

        const handleJoinRoom = (data) => {
          socket.join(data.room);
          let room = rooms.find((room) => room.name === data.room);
          if (!room) {
            room = {
              name: data.room,
              users: [{ ...data.user, socketId: socket.id }],
              messages: [],
            };
            console.log(room);
            rooms.push(room);
          } else {
            room.users.push({ ...data.user, socketId: socket.id });
            console.log(room);
          }
          io.to(data.room).emit("room-users", room);
        };

        const handleLeaveRoom = () => {
          let affectedRooms = [];
          console.log(socket.id, "Leaving");
          rooms.forEach((room) => {
            affectedRooms.push(room);
            console.log(socket.id);
            room.users = room.users.filter(
              (user) => user.socketId !== socket.id
            );
            if (room.users.length === 0) {
              rooms.splice(rooms.indexOf(room), 1);
            }
          });
          affectedRooms.forEach((room) => {
            io.to(room.name).emit("room-users", room);
          });
        };
        socket.on("join-room", handleJoinRoom);
        socket.on("leave-room", handleLeaveRoom);
        socket.on("disconnect", handleLeaveRoom);
        socket.on("send-message-room", addMessage);
        socket.on("typing-room", (data) => {
          console.log(data, "Typing");
          io.to(data.room).emit("typing", data.user);
        });
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });
